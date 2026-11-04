$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Read-SafeXml([string] $Text) {
    $settings = New-Object System.Xml.XmlReaderSettings
    $settings.DtdProcessing = [System.Xml.DtdProcessing]::Prohibit
    $settings.XmlResolver = $null
    $inputText = New-Object System.IO.StringReader($Text)
    $reader = [System.Xml.XmlReader]::Create($inputText, $settings)
    try {
        $document = New-Object System.Xml.XmlDocument
        $document.XmlResolver = $null
        $document.Load($reader)
        return ,$document
    }
    finally {
        $reader.Dispose()
        $inputText.Dispose()
    }
}

function Assert-OrderSchema([System.Xml.XmlDocument] $Document) {
    if ($Document.DocumentElement.LocalName -ne 'Order' -or
        $Document.DocumentElement.NamespaceURI -ne 'urn:example:orders') {
        throw [System.Xml.Schema.XmlSchemaValidationException]::new('Unexpected order root or namespace.')
    }
    $Document.Schemas = $script:schemas
    $Document.Validate($null)
}

function Get-ElementSignature([System.Xml.XmlElement] $Element) {
    $attributes = @($Element.Attributes | Where-Object {
        $_.NamespaceURI -ne 'http://www.w3.org/2000/xmlns/'
    } | Sort-Object NamespaceURI, LocalName | ForEach-Object {
        "{$($_.NamespaceURI)}$($_.LocalName)=$($_.Value)"
    })
    $children = @($Element.ChildNodes | Where-Object {
        $_.NodeType -eq [System.Xml.XmlNodeType]::Element
    } | ForEach-Object { Get-ElementSignature $_ })
    $text = @($Element.ChildNodes | Where-Object {
        $_.NodeType -eq [System.Xml.XmlNodeType]::Text -or
        $_.NodeType -eq [System.Xml.XmlNodeType]::CDATA
    } | ForEach-Object { $_.Value }) -join ''
    return @("{$($Element.NamespaceURI)}$($Element.LocalName)", $attributes, $text, $children) |
        ConvertTo-Json -Compress -Depth 20
}

$schemas = New-Object System.Xml.Schema.XmlSchemaSet
$schemas.XmlResolver = $null
$schemaSettings = New-Object System.Xml.XmlReaderSettings
$schemaSettings.DtdProcessing = [System.Xml.DtdProcessing]::Prohibit
$schemaSettings.XmlResolver = $null
$schemaReader = [System.Xml.XmlReader]::Create((Join-Path $PSScriptRoot 'Order.xsd'), $schemaSettings)
try {
    $null = $schemas.Add('urn:example:orders', $schemaReader)
    $schemas.Compile()
}
finally {
    $schemaReader.Dispose()
}

$order = Read-SafeXml (Get-Content -LiteralPath (Join-Path $PSScriptRoot 'order.xml') -Raw)
Assert-OrderSchema $order

$transform = New-Object System.Xml.Xsl.XslCompiledTransform
$mapReader = [System.Xml.XmlReader]::Create(
    (Join-Path $PSScriptRoot 'OrderToFulfillment.xslt'), $schemaSettings)
try {
    $transform.Load($mapReader, [System.Xml.Xsl.XsltSettings]::Default, $null)
}
finally {
    $mapReader.Dispose()
}

$buffer = New-Object System.IO.StringWriter
$writer = [System.Xml.XmlWriter]::Create($buffer, $transform.OutputSettings)
try {
    $transform.Transform($order, $null, $writer)
    $writer.Flush()
    $actual = Read-SafeXml $buffer.ToString()
}
finally {
    $writer.Dispose()
    $buffer.Dispose()
}
$expected = Read-SafeXml (Get-Content -LiteralPath (Join-Path $PSScriptRoot 'expected.xml') -Raw)
if ((Get-ElementSignature $actual.DocumentElement) -cne
    (Get-ElementSignature $expected.DocumentElement)) {
    throw 'Transformed XML does not match expected fulfillment XML.'
}
Write-Output 'PASS: valid order matches expected fulfillment XML.'

$invalid = Read-SafeXml (Get-Content -LiteralPath (Join-Path $PSScriptRoot 'invalid-order.xml') -Raw)
$rejected = $false
try { Assert-OrderSchema $invalid }
catch [System.Xml.Schema.XmlSchemaValidationException] { $rejected = $true }
if (-not $rejected) { throw 'Schema accepted an invalid quantity.' }
Write-Output 'PASS: invalid quantity is rejected.'

$unexpected = Read-SafeXml '<Order xmlns="urn:unexpected" id="SO-1001"><CustomerId>C-42</CustomerId><Quantity>2</Quantity></Order>'
$rejected = $false
try { Assert-OrderSchema $unexpected }
catch [System.Xml.Schema.XmlSchemaValidationException] { $rejected = $true }
if (-not $rejected) { throw 'Schema accepted an unexpected namespace.' }
Write-Output 'PASS: unexpected namespace is rejected.'

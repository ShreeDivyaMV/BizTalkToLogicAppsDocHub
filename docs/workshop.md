---
title: XML transformation lab
description: Validate a namespaced XML order, execute XSLT and compare the output locally without Azure or the Migration Agent.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Validate and transform an XML order

This small lab isolates a common migration problem: preserve a schema contract and an XML mapping before wiring up connectors. The supplied PowerShell script executes XSD validation and XSLT locally using .NET.

No Azure subscription, Migration Agent or production connection is required. It does **not** execute an Azure workflow, test adapter behavior or prove arbitrary BizTalk maps are compatible.

Looking for the complete tooling exercise? Start with the [Migration Agent hands-on lab](./agent-lab.md). This XML lab is a supplemental artifact-regression exercise, not an Agent source project.

## Download the files

Save these files into one local folder:

- <a href={useBaseUrl('/downloads/xml-lab/Order.xsd')} download>Order.xsd</a>
- <a href={useBaseUrl('/downloads/xml-lab/OrderToFulfillment.xslt')} download>OrderToFulfillment.xslt</a>
- <a href={useBaseUrl('/downloads/xml-lab/order.xml')} download>order.xml</a>
- <a href={useBaseUrl('/downloads/xml-lab/invalid-order.xml')} download>invalid-order.xml</a>
- <a href={useBaseUrl('/downloads/xml-lab/expected.xml')} download>expected.xml</a>
- <a href={useBaseUrl('/downloads/xml-lab/Test-OrderTransform.ps1')} download>Test-OrderTransform.ps1</a>

The script requires Windows PowerShell 5.1 or later with .NET XML APIs. Inspect downloaded scripts before running them and follow your organization's execution policy; no policy bypass is required by this lab.

## Input and expected result

Input:

```xml
<Order xmlns="urn:example:orders" id="SO-1001">
  <CustomerId>C-42</CustomerId>
  <Quantity>2</Quantity>
</Order>
```

Expected output:

```xml
<FulfillmentRequest xmlns="urn:example:fulfillment">
  <OrderId>SO-1001</OrderId>
  <Customer>C-42</Customer>
  <Units>2</Units>
</FulfillmentRequest>
```

The schema requires a non-empty ID/customer and a positive integer quantity. The map binds the source namespace explicitly.

## Run the assertions

From the folder containing the downloads:

```powershell
.\Test-OrderTransform.ps1
```

The script fails with a non-zero exit if any assertion fails. It verifies:

1. The valid input passes XSD validation.
2. The XSLT output matches the expected XML by expanded element names, attributes and text, ignoring formatting.
3. The invalid fixture with a zero quantity is rejected.
4. A message in an unexpected namespace is rejected rather than silently mapped.

Expected output:

```text
PASS: valid order matches expected fulfillment XML.
PASS: invalid quantity is rejected.
PASS: unexpected namespace is rejected.
```

DTD processing, external resolution, XSLT script and `document()` access are disabled in this local sample.

## Try a controlled change

Change a copied input's quantity to another positive value and update the expected fixture to match. Change the quantity to zero and observe validation failure. Restore the original fixtures before using the lab as a regression check.

For real maps, add cases for optional/empty values, non-ASCII data, large documents, imported schemas and custom extension functions. Do not enable external resource access simply to make an unreviewed map execute.

## Use the same artifacts in Standard

1. Create a test-only Standard project with the documented tooling.
2. Add the schema and map as supported application artifacts.
3. Create an isolated trigger, then add XML validation and Transform XML operations using the designer.
4. Select the intended schema/map references and run the same fixtures through the runtime.
5. Compare the output, check the invalid input's visible failure path, and inspect run diagnostics.

Only then add the real receive/send operations and test identity, network, retries and acknowledgments. A passing local XSLT test is not a connector or production integration test.

Continue with [schemas and pipelines](./transforms.md), [connections](./connectivity.md), or [deployment configuration](./deployment.md).

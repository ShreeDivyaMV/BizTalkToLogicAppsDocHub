---
title: Schemas, maps and pipelines
description: Preserve XML contracts, adapt XSLT maps and decompose BizTalk pipeline behavior.
---

# Preserve the message contract

Treat parsing, validation and transformation as distinct operations. A transform that returns well-formed XML can still produce the wrong business message.

## Schemas and namespaces

- Keep the source namespace URI and element qualification rules intact until you intentionally change the contract.
- Resolve imported/included schemas and deploy the referenced artifacts.
- Validate required fields, cardinality, enumerations and numeric constraints before creating external side effects.
- Distinguish an absent element, an empty element and `xsi:nil`; they are not interchangeable for all consumers.
- Test UTF-8/non-ASCII values, byte-order marks, dates, decimal separators and payload limits.

XPath and XSLT prefixes bind to namespace **URIs**, not the prefix spelling in the message. An XPath matching `/Order` will not match a namespaced `{urn:example:orders}Order`.

## Moving BizTalk maps

A `.btm` design file is not an executable XSLT map simply because its extension changes. Inspect the generated XSLT, included templates, script/custom functoids and referenced assemblies. Determine the transform engine and extension support required by that code.

For Standard, maps and schemas can be deployed as application artifacts where the chosen action supports them. An integration account is not universally required for local maps; other B2B artifacts and operations have their own requirements.

Typical project artifacts:

```text
Artifacts/
  Schemas/
    order.xsd
  Maps/
    order-to-fulfillment.xslt
OrderIntake/
  workflow.json
```

Add **XML validation** and **Transform XML** operations through the Standard designer and select the intended schema/map source. Inspect the generated action references, then run a fixture through the actual runtime. Avoid copying a connector-specific action definition between built-in and managed operations without checking its inputs.

## A namespace-aware map

The [downloadable lab](./workshop.md) includes an executable XSLT 1.0 map. Its key selection is:

```xml
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:o="urn:example:orders"
  xmlns:f="urn:example:fulfillment"
  exclude-result-prefixes="o">
  <xsl:template match="/o:Order">
    <f:FulfillmentRequest>
      <f:OrderId><xsl:value-of select="@id"/></f:OrderId>
    </f:FulfillmentRequest>
  </xsl:template>
</xsl:stylesheet>
```

This is an explanatory fragment. Use the full lab map, including the explicit unexpected-root failure template, rather than relying on XSLT's built-in templates for unknown inputs.

## Pipeline behavior

Break receive/send pipelines down by semantics:

| Existing behavior | Candidate implementation | What to preserve |
| --- | --- | --- |
| Decode / decompress | Native supported operation or bounded custom code | Charset, compression limits and malformed-input failure |
| Disassemble envelopes | Envelope processing or explicit item iteration | Per-document identity, ordering and partial failure handling |
| Validate XML | Schema validation action | Required constraints, imported schemas and visible rejection |
| Map | Compatible XML transform | Namespace, extension dependencies and exact business values |
| Promote context properties | Explicit workflow data and broker properties | Routing/correlation values and their types |
| Sign / encrypt / send | Appropriate B2B/protocol operation | Certificate selection, trust, acknowledgments and renewal |

Do not silently replace streaming pipeline components with an in-memory implementation. Measure peak payload memory and concurrency; local functions have limitations for BizTalk streaming components.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Empty output or text-only output | Root namespace, template match and XSLT built-in templates |
| "Schema not found" | Artifact deployment, schema name and import/include paths |
| Custom functoid fails | Generated XSLT extension functions and target engine compatibility |
| Different numeric/date output | Culture-sensitive code, decimal formatting and time-zone assumptions |
| A bad batch loses valid documents | Per-item failure handling and acknowledgment boundaries |

Reference: [Transform XML and artifact storage options](https://learn.microsoft.com/en-us/azure/logic-apps/logic-apps-enterprise-integration-transform).

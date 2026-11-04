<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:o="urn:example:orders"
  xmlns:f="urn:example:fulfillment"
  exclude-result-prefixes="o">
  <xsl:output method="xml" indent="yes" encoding="utf-8"/>
  <xsl:template match="/">
    <xsl:choose>
      <xsl:when test="o:Order">
        <xsl:apply-templates select="o:Order"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:message terminate="yes">Expected an Order in urn:example:orders.</xsl:message>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  <xsl:template match="o:Order">
    <f:FulfillmentRequest>
      <f:OrderId><xsl:value-of select="@id"/></f:OrderId>
      <f:Customer><xsl:value-of select="o:CustomerId"/></f:Customer>
      <f:Units><xsl:value-of select="o:Quantity"/></f:Units>
    </f:FulfillmentRequest>
  </xsl:template>
</xsl:stylesheet>

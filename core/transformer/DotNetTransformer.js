"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AndroidTransformer_1 = require("./AndroidTransformer");
var os_1 = require("os");
var dotNetHeader = '<?xml version="1.0" encoding="utf-8"?>' +
    '<root>' +
    '  <xsd:schema id="root" xmlns="" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">' +
    '    <xsd:import namespace="http://www.w3.org/XML/1998/namespace" />' +
    '    <xsd:element name="root" msdata:IsDataSet="true">' +
    '      <xsd:complexType>' +
    '        <xsd:choice maxOccurs="unbounded">' +
    '          <xsd:element name="metadata">' +
    '            <xsd:complexType>' +
    '              <xsd:sequence>' +
    '                <xsd:element name="value" type="xsd:string" minOccurs="0" />' +
    '              </xsd:sequence>' +
    '              <xsd:attribute name="name" use="required" type="xsd:string" />' +
    '              <xsd:attribute name="type" type="xsd:string" />' +
    '              <xsd:attribute name="mimetype" type="xsd:string" />' +
    '              <xsd:attribute ref="xml:space" />' +
    '            </xsd:complexType>' +
    '          </xsd:element>' +
    '          <xsd:element name="assembly">' +
    '            <xsd:complexType>' +
    '              <xsd:attribute name="alias" type="xsd:string" />' +
    '              <xsd:attribute name="name" type="xsd:string" />' +
    '            </xsd:complexType>' +
    '          </xsd:element>' +
    '          <xsd:element name="data">' +
    '            <xsd:complexType>' +
    '              <xsd:sequence>' +
    '                <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />' +
    '                <xsd:element name="comment" type="xsd:string" minOccurs="0" msdata:Ordinal="2" />' +
    '              </xsd:sequence>' +
    '              <xsd:attribute name="name" type="xsd:string" use="required" msdata:Ordinal="1" />' +
    '              <xsd:attribute name="type" type="xsd:string" msdata:Ordinal="3" />' +
    '              <xsd:attribute name="mimetype" type="xsd:string" msdata:Ordinal="4" />' +
    '              <xsd:attribute ref="xml:space" />' +
    '            </xsd:complexType>' +
    '          </xsd:element>' +
    '          <xsd:element name="resheader">' +
    '            <xsd:complexType>' +
    '              <xsd:sequence>' +
    '                <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />' +
    '              </xsd:sequence>' +
    '              <xsd:attribute name="name" type="xsd:string" use="required" />' +
    '            </xsd:complexType>' +
    '          </xsd:element>' +
    '        </xsd:choice>' +
    '      </xsd:complexType>' +
    '    </xsd:element>' +
    '  </xsd:schema>' +
    '  <resheader name="resmimetype">' +
    '    <value>text/microsoft-resx</value>' +
    '  </resheader>' +
    '  <resheader name="version">' +
    '    <value>2.0</value>' +
    '  </resheader>' +
    '  <resheader name="reader">' +
    '    <value>System.Resources.ResXResourceReader, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>' +
    '  </resheader>' +
    '  <resheader name="writer">' +
    '    <value>System.Resources.ResXResourceWriter, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>' +
    '  </resheader>';
/**
 * Created by amatsegor on 5/4/17.
 */
//TODO: finish + testing
var DotNetTransformer = (function () {
    function DotNetTransformer() {
    }
    DotNetTransformer.prototype.transformComment = function (comment) {
        return new AndroidTransformer_1.AndroidTransformer().transformComment(comment);
    };
    DotNetTransformer.prototype.transformKeyValue = function (key, value) {
        //TODO: normalize string + detect format (%s => {0})
        return '<data name="' + key + '" xml:space="preserve">' + os_1.EOL
            + '   <value>' + value + '</value>' + os_1.EOL
            + '</data>' + os_1.EOL;
    };
    DotNetTransformer.prototype.insert = function (input, newValues) {
        //TODO: use auto-generated tag
        return dotNetHeader + os_1.EOL + newValues + '</root>';
    };
    return DotNetTransformer;
}());
exports.DotNetTransformer = DotNetTransformer;
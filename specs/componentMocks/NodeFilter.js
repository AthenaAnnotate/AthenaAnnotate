const NodeFilter = function() {};

NodeFilter.FILTER_ACCEPT = 1;
NodeFilter.FILTER_REJECT = 2;
NodeFilter.FILTER_SKIP   = 3;

NodeFilter.SHOW_ALL                    = 0xFFFFFFFF;
NodeFilter.SHOW_ELEMENT                = 0x00000001;
NodeFilter.SHOW_ATTRIBUTE              = 0x00000002;
NodeFilter.SHOW_TEXT                   = 0x00000004;
NodeFilter.SHOW_CDATA_SECTION          = 0x00000008;
NodeFilter.SHOW_ENTITY_REFERENCE       = 0x00000010;
NodeFilter.SHOW_ENTITY                 = 0x00000020;
NodeFilter.SHOW_PROCESSING_INSTRUCTION = 0x00000040;
NodeFilter.SHOW_COMMENT                = 0x00000080;
NodeFilter.SHOW_DOCUMENT               = 0x00000100;
NodeFilter.SHOW_DOCUMENT_TYPE          = 0x00000200;
NodeFilter.SHOW_DOCUMENT_FRAGMENT      = 0x00000400;
NodeFilter.SHOW_NOTATION               = 0x00000800;

NodeFilter.prototype.acceptNode = function() {
  return NodeFilter.FILTER_ACCEPT;
};

export default NodeFilter;

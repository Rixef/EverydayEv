const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

var TZs = {
  "ET": -05,
  "CT": -06,
  "MT": -07,
  "PT": -08,
  "AK": -09,
  "HAST": -10,
  "MST": -07,
  "AST": -04,
  "MOST": 0,
  "UTC": 0,
  "GMT": 0,
  "GST": 0,
  "WET": 01,
  "CET": 01,
  "RST": 01,
  "CEST": 01,
  "ECT": 01,
  "JST": 02,
  "GTBST": 02,
  "MEST": 02,
  "EGST": 02,
  "SST": 02,
  "SAST": 02,
  "EET": 02,
  "ISST": 02,
  "EEST": 02,
  "NMST": 02,
  "ARST": 03,
  "ABST": 03,
  "MSK": 03,
  "EAT": 03,
  "IRST": 03/*with 30mins(UTC+03:30)*/,
  "ARBST": 04,
  "AZT": 04,
  "MUT": 04,
  "GET": 04,
  "AMT": 04,
  "AFT": 04/*+30mins(UTC+04:30)*/,
  "YEKT": 05,
  "PKT": 05,
  "WAST": 05,
  "IST": 05/*+30m(UTC+05:30)*/,
  "SLT": 05/*+30m(UTC+05:30)*/,
  "NPT": 05/*+45m(UTC+05:45)*/,
  "BTT": 06,
  "BST": 06,
  "NCAST": 06,
  "MYST": 06/*+30m(UTC+06:30)*/,
  "THA": 07,
  "KRAT": 07,
  "": 08,
  "IRKT": 08,
  "SNST": 08,
  "AWST": 08,
  "TIST": 08,
  "UST": 08,
  "TST": 09,
  "KST": 09,
  "YAKT": 09,
  "CAUST": 09/*+30m(UTC+09:30)*/,
  "ACST": 09/*+30m(UTC+09:30)*/,
  "EAST": 10,
  "AEST": 10,
  "WPST": 10,
  "TAST": 10,
  "VLAT": 10,
  "SBT": 11,
  "NZST": 12,
  "UTC12": 12,
  "FJT": 12,
  "PETT": 12,
  "PHOT": 13,
  "AZOST": -01,
  "CVT": -01,
  "ESAST": -03,
  "ART": -03,
  "SAEST": -03,
  "GNST": -03,
  "MVST": -03,
  "NST": -03,
  "PRST": -04,
  "CBST": -04,
  "SAWST": -04,
  "PSAST": -04,
  "VST": -04/*-30m(UTC-04:30)*/,
  "SAPST": -05,
  "EST": -05,
  "CAST": -06,
  "CST": -06,
  "CCST": -06,
  "MSTM": -07,
  "PST": -08,
  "SMST": -11,
  "BIT": -12,
};

var getcontent = context.params.event.content.replace("!consolelog ","");

console.log(TZs[getcontent]);

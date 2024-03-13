export type Measure = {
  [key: string]: any;
}

export type Sys21M1 = Measure & {
  screenSaverIsEnabled: boolean,
  screenSaverPasswordProtected: boolean,
  needAuthToChangePassword: boolean,
  autoLogonIsDisabled: boolean,
  baseObjectsAreAudited: boolean
}

export type Sys21M3 = Measure & {
  automaticUpdatingEnabled: boolean,
  checkForUpdatesDailyEnabled: boolean,
  controlUpdateServerAuthenticity: boolean,
  checkUpdatePackagesIntegrity: boolean,
  usesWSUS: boolean,
  previousStateIsRestorable: boolean
}

export type Sys21M6 = Measure & {
  antiMalwareEnabled: boolean,
  antiMalwareUpToDate: boolean
}

export type Sys223M5 = Measure & {
  firewallEnabled: boolean,
  antivirusEnabled: boolean,
  firewallUpToDate: boolean,
  antivirusUpToDate: boolean,
}

export type Sys223M9 = Measure & {
  KerberosOrNTLMv2Enabled: boolean
}

export type Sys223M13 = Measure & {
  smartScreenEdgeDisabled: boolean,
  smartScreenPuaDisabled: boolean
}

export type Sys223M14 = Measure & {
  cortanaDisabled: boolean
}

export type Sys223M18 = Measure & {
  allRemoteAssistanceRulesAreAllowed: boolean
}

export type Sys223M19 = Measure & {
  allRDPRulesAreAllowed: boolean
}
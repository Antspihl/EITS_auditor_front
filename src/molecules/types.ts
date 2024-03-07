export type Measure = {}

export type Sys223M5 = Measure & {
  firewallEnabled: boolean,
  antivirusEnabled: boolean,
  firewallUpToDate: boolean,
  antivirusUpToDate: boolean,
}

export type Sys21M1 = Measure & {
  screenSaverIsEnabled: boolean,
  screenSaverPasswordProtected: boolean,
  needAuthToChangePassword: boolean,
  autoLogonIsDisabled: boolean,
  baseObjectsAreAudited: boolean
}

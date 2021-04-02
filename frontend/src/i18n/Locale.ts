export interface Locale {
  locale: string; // !Must not be deleted. Used for providing the locale in the native language
  flagUrl: string;

  example: {
    title: string;
    byLine: string;
    dataLine: string;

    actions: {
      addNew: string;
    };
  };

  common: {
    search: string;
    add: string;
  };

  accounts: {
    accounts: string;
    id: string;
    name: string;
    email: string;
    tel: string;
    address: string;
    address1: string;
    address2: string;
    cvrNumber: string;
    addAccount: string;
    street: string;
    streetNum: string;
    postCode: string;
    city: string;
    country: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
    CVR_getFromRegistry: string;
    CVR_apiErrorTitle: string;
    CVR_apiErrorDescription: string;
    accountant: string;
    fetching: string;
  };

  login: {
    email: string;
    password: string;
    login: string;
    forgotPassword: string;
    invalidMsg: string;
  };

  admins: {
    admins: string;
  };

  actions: {
    update: string;
    delete: string;
  };

  password: {
    password: string;
    repeatPassword: string;
    newPassword: string;
    repeatNewPassword: string;
    dontMatch: string;
    tooShort: string;
    missingUppercase: string;
    missingLowercase: string;
    missingNumber: string;
    changePassword: string;
    changeSuccessTitle: string;
    changeSuccessText: string;
    changeFailTitle: string;
    changeFailText: string;
  };

  accountant: {
    editAccountant: string;
    addAccountant: string;
    noAccountant: string;
    addSuccessTitle: string;
    addSuccessText: string;
    addErrorTitle: string;
    addErrorText: string;
    deleteSuccessTitle: string;
    deleteSuccessText: string;
    deleteErrorTitle: string;
    deleteErrorText: string;
    alreadyAssignedTitle: string;
    alreadyAssignedText: string;
  };
}

/* Email validation patten "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+(\.[A-Za-z]+)"  */

export interface IUserConfig {
    email?: string;
    usersUrl?: string;
    imgfile?: string;
}

export class User implements IUserConfig {
    email?: '';
    FirstName?: '';
    SecondName?: '';
}

export interface INotifyConifg {
    from: string;
    align: string;
    title: string;
    message: string;
    color: number;
    timer?: number;
    delay?: number;
}

export class AppConst {
    public static readonly STORE_API_PATHS = {
        getMenuItems: '/apiMenuitems',
        getItems: '/apiNewModelItems',
        itemDescription: '/apiNewModelItems/{{id}}',
        buyItems: '/people',
        verfiyVoucher: '/people'
    };

    public static readonly DEFAULT_CURRENCY_SYMBOL = '£';

    public static readonly VOUCHER_CODES = {
        OFF5: '5OFF',
        OFF10: '10OFF',
        OFF15: '15OFF'
    };
}


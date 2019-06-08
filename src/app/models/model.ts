/* Email validation patten "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+(\.[A-Za-z]+)"  */
export interface ISubItem {
    subItemName: string;
    subItemString: string;
    subItemUrl: string;
    translateKey: string; // For translate 用于在翻译的时候，根据这个key值在翻译文件中找到对应翻译的字符串
}
export interface IMenuItem {
    buttonName: string;
    iconString: string;
    translateKey: string; // For translate 用于在翻译的时候，根据这个key值在翻译文件中找到对应翻译的字符串
    subItems: ISubItem[];
}

export interface IUserConfig {
    email: string;
    usersUrl?: string;
    imgfile?: string;
}

export class User implements IUserConfig {
    email: '';
    FirstName?: '';
    SecondName?: '';
}

export interface INotifyConifg {
    from: string;
    align: string;
    title: string;
    message: string;
    color: number; // 类型数组中的索引
    timer?: number;
    delay?: number;
}

export class AppConst {
    public static readonly STORE_API_PATHS = {
        userCheck: '/api/usercheck',
        getMenuItems: '/api/menuitems',
        getItems: '/api/newModelItems',
        itemDescription: '/api/newModelItems/{{id}}',
        getProducts: '/api/productlist',
        buyItems: '/people',
        verfiyVoucher: '/people'
    };

    public static readonly DEFAULT_CURRENCY_SYMBOL = '￥';

    public static readonly VOUCHER_CODES = {
        OFF5: '5OFF',
        OFF10: '10OFF',
        OFF15: '15OFF'
    };
}


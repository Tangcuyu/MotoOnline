/* 商品详细信息类型定义： */
import { Image } from './image';

export class ItemDescription {
    _id: string;
    id: string;
    name: string;
    title: string;
    sku: number; //  库存数
    max_items: number; // 允许最大下单数
    weight: number;
    length: number;
    height: number;
    width: number;
    depth: number;
    output: number;
    color: string[];
    slug: string;
    count: number; // 订单项数量
    image: Image;
    images: Image[];
    thumbnail: string;
    productBrief: string;
    productDetail: string;
    track_inventory: boolean;
    price: number;  // 销售价格
    display_price: number; // 列表价格
    cost_price: number; // 成本价格
    priceAfterDiscount: number; // 经过优惠后的价格
    selling_price: number; // 经过调整后的，最终成交价格
    option_values: string[];
    total_on_hand: number; // 现货数量
    options_text: string;
    in_stock: boolean;
    is_backorderable: boolean;
    is_destroyed: boolean;
    is_orderable: boolean;
    is_master?: boolean;
  constructor(inputObj) {
    if (inputObj) {
      this.id = inputObj.id;
      this.name = inputObj.name;
      this.title = inputObj.title;
      this.sku = Number(inputObj.sku);
      this.max_items = Number(inputObj.max_items);
      this.height = inputObj.height;
      this.length = inputObj.length;
      this.weight = inputObj.weight;
      this.width = inputObj.width;
      this.depth = inputObj.depth;
      this.output = inputObj.output;
      this.color = inputObj.color;
      this.slug = inputObj.slug;
      this.count = inputObj.count;
      this.image = inputObj.image;
      this.images = inputObj.images;
      this.thumbnail = inputObj.thumbnail;
      this.track_inventory = inputObj.track_inventory;
      this.productBrief = inputObj.productBrief;
      this.productDetail = inputObj.productDetail;
      this.price = Number(inputObj.price);
      this.display_price = Number(inputObj.display_price);
      this.cost_price = Number(inputObj.cost_price);
      this.selling_price = Number(inputObj.selling_price);
      this.option_values = inputObj.option_values;
      this.options_text = inputObj.options_text;
      this.total_on_hand = Number(inputObj.total_on_hand);
      this.in_stock = inputObj.in_stock;
      this.is_backorderable = inputObj.is_backorderable;
      this.is_destroyed = inputObj.is_destroyed;
      this.is_orderable = inputObj.is_orderable;
    }
  }
}

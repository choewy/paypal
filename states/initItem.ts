import { Item } from '@/interfaces';

export class InitItem implements Item {
  id = 0;
  name = '';
  price = '';
  brand = '';
  rating = 0;
  category = null;
  currency = null;
  description = '';
  image_link = '';
  price_sign = null;
  product_api_url = '';
  product_colors = [];
  product_link = '';
  product_type = '';
  tag_list = [];
  website_link = '';
  api_featured_image = '';
  created_at = '';
  updated_at = '';
}

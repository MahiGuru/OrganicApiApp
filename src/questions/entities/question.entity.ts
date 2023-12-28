import { CoreEntity } from 'src/common/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Feedback } from '../../feedbacks/entities/feedback.entity';

export class Question extends CoreEntity {
  user_id: number | string;
  product_id: number | string;
  shop_id: number | string;
  question?: string;
  answer: string;
  positive_feedbacks_count?: number;
  negative_feedbacks_count?: number;
  product: Product;
  user: User;
  feedbacks?: Feedback[];
  my_feedback?: Feedback;
}

export default interface IBook extends Document {
  title: string;
  author: string;
  published_date: Date;
  ISBN: string;
  coverImage?: string;
}

export interface BookPayload {
  title: string;
  author: string;
  publishedDate: Date;
  ISBN: string;
  coverImage?: string;
}
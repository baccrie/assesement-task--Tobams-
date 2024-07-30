export default interface IBook extends Document {
  title: string;
  author: string;
  published_date: Date;
  ISBN: string;
  coverImage?: string;
}
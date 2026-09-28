export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
};

export const BOOKS: Book[] = [
  {
    id: 'book-001',
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    price: 86000,
    description: 'Cuốn sách nổi tiếng nhất về nghệ thuật giao tiếp và đối nhân xử thế.',
  },
  {
    id: 'book-002',
    title: 'Nhà Giả Kim',
    author: 'Paulo Coelho',
    price: 79000,
    description: 'Hành trình theo đuổi ước mơ và lắng nghe tiếng nói của trái tim.',
  },
  {
    id: 'book-003',
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
    author: 'Rosie Nguyễn',
    price: 90000,
    description: 'Cuốn cẩm nang truyền cảm hứng và định hướng cho người trẻ.',
  },
  {
    id: 'book-004',
    title: 'Tư Duy Nhanh Và Chậm',
    author: 'Daniel Kahneman',
    price: 155000,
    description: 'Khám phá hai hệ thống tư duy chi phối cách con người đưa ra quyết định.',
  },
];

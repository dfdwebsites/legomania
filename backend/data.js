import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Danny',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false
    }
  ],
  products: [
    {
      // _id: '1',
      name: 'Caesar"s Salad',
      slug: 'caesars-salad',
      category: 'Salads',
      image: '/images/caesarsSalad.jpg',
      price: 6.5,
      countInStock: 80,
      brand: null,
      rating: 4.5,
      numReviews: 30,
      description: 'Classic Caesar"s salad'
    },
    {
      // _id: '2',
      name: 'Mixed Salad',
      slug: 'mixed-salad',
      category: 'Salads',
      image: '/images/mixedSalad.jpg',
      price: 5.6,
      countInStock: 80,
      brand: null,
      rating: 4.2,
      numReviews: 30,
      description: 'Mixed fresh salad'
    },
    {
      // _id: '3',
      name: 'Oriental',
      slug: 'oriental',
      category: 'Salads',
      image: '/images/orientalSalad.jpg',
      price: 3.2,
      countInStock: 80,
      brand: null,
      rating: 3,
      numReviews: 30,
      description: 'Classic Oriental salad'
    },
    {
      // _id: '4',
      name: 'Green salad',
      slug: 'green-salad',
      category: 'Salads',
      image: '/images/greenSalad.jpg',
      price: 3.2,
      countInStock: 0,
      brand: null,
      rating: 3.5,
      numReviews: 30,
      description: 'Fresh Green salad'
    },
    {
      // _id: '5',
      name: 'Greek salad',
      slug: 'greek-salad',
      category: 'Salads',
      image: '/images/greekSalad.jpg',
      price: 5.6,
      countInStock: 80,
      brand: null,
      rating: 4,
      numReviews: 30,
      description: 'Original Greek salad'
    }
  ]
};

export default data;

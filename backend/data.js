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
      name: 'car',
      slug: 'car',
      category: 'vecicles',
      price: 25,
      countInStock: 15,
      rating: 3.5,
      numReviews: 25,
      description: 'starting description',
      image: '/images/test.jpg',
      images: []
    },
    {
      name: 'truck',
      slug: 'truck',
      category: 'vecicles',
      price: 95,
      countInStock: 15,
      rating: 3.5,
      numReviews: 25,
      description: 'starting description',
      image: '/images/truck.jpg',
      images: []
    },
    {
      name: 'boat',
      slug: 'boat',
      category: 'vecicles',
      price: 78,
      countInStock: 15,
      rating: 3.5,
      numReviews: 25,
      description: 'starting description',
      image: '/images/boat.jpg',
      images: []
    },
    {
      name: 'cafe',
      slug: 'cafe',
      category: 'buildings',
      price: 78,
      countInStock: 15,
      rating: 3.5,
      numReviews: 25,
      description: 'starting description',
      image: '/images/cafe.jpg',
      images: []
    },
    {
      name: 'fast car',
      slug: 'fast-car',
      category: 'vecicles',
      price: 78,
      countInStock: 15,
      rating: 3.5,
      numReviews: 25,
      description: 'starting description',
      image: '/images/fast-car.jpg',
      images: []
    },
    {
      name: 'Offroad Power',
      slug: 'offroad-power',
      category: 'vecicles',
      price: 78,
      countInStock: 15,
      rating: 3.5,
      numReviews: 25,
      description: 'starting description',
      image: '/images/offroad-power.jpg',
      images: []
    },
    {
      name: 'Lego truck',
      slug: 'truck2',
      category: 'vecicles',
      price: 78,
      countInStock: 15,
      rating: 3.5,
      numReviews: 25,
      description: 'starting description',
      image: '/images/truck2.jpg',
      images: []
    }
  ]
};

export default data;

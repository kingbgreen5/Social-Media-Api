const connection = require('../config/connection');
const { User } = require('../models');
const { Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist


  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  const users = [
  {
      'username': 'richlandDodge',
      'email': 'bigrich@email.com',
  },
  {
    'username': 'layfayetteGreen',
    'email':'thegreenone@email.com',
 
  },
  {
    'username': 'floydChickasaw',
    'email':'flyinfloydchickasaw@email.com',

  }
  ];

  const thoughts=[
    {
      'username': 'richlandDodge',
     'thoughtText': 'I like to walk my dog little Rich',
     'createdAt' : '1/18/2024'
  },
  {
    'username': 'layfayetteGreen',
    'thoughtText': 'Favorite Movie? The Big Green',
    'createdAt' : '1/18/2024'
  },
  {
    'username': 'floydChickasaw',
    'thoughtText': 'Chickasaw. Floyd Chickasaw',
    'createdAt' : '1/18/2024'
  }
  ]
  
  await Thought.collection.insertMany(thoughts);
  await User.collection.insertMany(users);


  console.table(thoughts);
  console.table(users);
  console.info('DB Sucessfully Seeded');
  process.exit(0);
});

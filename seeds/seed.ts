import { PrismaClient } from '@prisma/client';
import { defaultImages } from '../constants/images';
import { v4 as uuidv4 } from 'uuid';
const main = async () => {
  const db = new PrismaClient();
  const employees = [
    {
      id: uuidv4(),
      orgId: 'org_2gwAQxe2J0rItPAg6qtS6vx5etz',
      userId: uuidv4(),
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      imageUrl: defaultImages[0].urls.thumb,
      skills: ['First Aid', 'Security'],
    },
    {
      id: uuidv4(),
      orgId: 'org_2gwAQxe2J0rItPAg6qtS6vx5etz',
      userId: uuidv4(),
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '234-567-8901',
      imageUrl: defaultImages[1].urls.thumb,
      skills: ['Customer Service', 'Food Handling'],
    },
    {
      id: uuidv4(),
      orgId: 'org_2gwAQxe2J0rItPAg6qtS6vx5etz',
      userId: uuidv4(),
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      phone: '345-678-9012',
      imageUrl: defaultImages[2].urls.thumb,
      skills: ['Cleaning', "Driver's License"],
    },
    {
      id: uuidv4(),
      orgId: 'org_2gwAQxe2J0rItPAg6qtS6vx5etz',
      userId: uuidv4(),
      name: 'Bob Brown',
      email: 'bob.brown@example.com',
      phone: '456-789-0123',
      imageUrl: defaultImages[3].urls.thumb,
      skills: ['First Aid', 'Cleaning'],
    },
    {
      id: uuidv4(),
      orgId: 'org_2gwAQxe2J0rItPAg6qtS6vx5etz',
      userId: uuidv4(),
      name: 'Carol White',
      email: 'carol.white@example.com',
      phone: '567-890-1234',
      imageUrl: defaultImages[4].urls.thumb,
      skills: ['Security', 'Customer Service'],
    },
    {
      id: uuidv4(),
      orgId: 'org_2gwAQxe2J0rItPAg6qtS6vx5etz',
      userId: uuidv4(),
      name: 'David Green',
      email: 'david.green@example.com',
      phone: '678-901-2345',
      imageUrl: defaultImages[5].urls.thumb,
      skills: ['Food Handling', 'Security'],
    },
    {
      id: uuidv4(),
      orgId: 'org_2gwAQxe2J0rItPAg6qtS6vx5etz',
      userId: uuidv4(),
      name: 'Eva Blue',
      email: 'eva.blue@example.com',
      phone: '789-012-3456',
      imageUrl: defaultImages[6].urls.thumb,
      skills: ['Cleaning', 'Customer Service'],
    },
    {
      id: uuidv4(),
      orgId: 'org_2gwAQxe2J0rItPAg6qtS6vx5etz',
      userId: uuidv4(),
      name: 'Frank Yellow',
      email: 'frank.yellow@example.com',
      phone: '890-123-4567',
      imageUrl: defaultImages[7].urls.thumb,
      skills: ['First Aid', "Driver's License"],
    },
    {
      id: uuidv4(),
      orgId: 'org_2gwAQxe2J0rItPAg6qtS6vx5etz',
      userId: uuidv4(),
      name: 'Grace Black',
      email: 'grace.black@example.com',
      phone: '901-234-5678',
      imageUrl: defaultImages[8].urls.thumb,
      skills: ['Security', 'Food Handling'],
    },
  ];
  try {
    await db.employee.createMany({
      data: employees,
      skipDuplicates: true,
    });
  } catch (e) {
    console.error(e);
  } finally {
    await db.$disconnect();
  }
};

main().catch((error) => console.error('Script execution error:', error));

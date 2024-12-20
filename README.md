# 🌟 Office Automata

Welcome to the Office Automata project! This guide will help you set up, configure, and start your project quickly.

---

## 📦 Project Tech Stack

- </> **TypeScript**
- ⚡ **Next.js Framework**
- 📄 **Prisma ORM**
- 💾 **MySQL**

---

## 🛠️ Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/edmart-systems/office-automation
cd office-automation
```

### Step 2: Install Dependencies

- Ensure `node` is installed, preferably v20.10.0
- Ensure `npm` is installed, preferably v10.2.3

##### 1. Install all required packages with:

```
npm install
```

## ⚙️ Configuration

### Step 3: Configure the Environment

##### 1. Rename env.example to .env:

```
cp env.example .env
```

##### 2. Open the .env file and update the following:

- Database Credentials: Provide the MySQL host, username, password, and database name.
- Optional, Email Credentials: Add your email service provider's API key and credentials.

### Step 4: Set Up the Database

##### 1. Create a new MySQL database:

- Update .env to with the created database name

##### 2. Initialize Prisma:

```
npx prisma migrate dev
```

## 🚀 Running the Project

### Development

```
npm run dev
```

- The app will be live at [http://localhost:3765.](http://localhost:3765)

## Login

##### User 1 (Admin):

- Email `mike.smith@test.com`
- Password `Psu#sm3RSMgS-92`

##### User 2 (Normal User):

- Email `jane.smith@test.com`
- Password `Psu#sm3RSMgS-91`

## 💡 Additional Notes

- Ensure MySQL is installed and running locally or hosted.
- Use an email service provider like Mailtrap, SendGrid, or Gmail for email integration.

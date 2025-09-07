# Node.js E-commerce Case Study
## Analytics Features Implementation

---

## 🎯 Objective
Implement analytics features for an e-commerce application, including product trends and visitor tracking, with bucket-based filtering and date-range support.

---

## 📁 Project Structure

ecom-evaluation-app/
│
├── server/
│ ├── controllers/
│ │ └── dashboard.js
│ ├── routes/
│ │ └── dashboard.js
│ └── db/
│ └── db.js
├── package.json
├── package-lock.json
├── .env
└── Implementation.md



---

## 🛠 Implementation Approach

1. **Database**
   - Added two new tables for analytics:
     - `product_trends` – to track product-related statistics.
     - `visitor_logs` – to track visitor activity on the platform.
   - Used MySQL with `mysql2` and `dotenv` for environment configuration.

2. **APIs**
   - Created two main endpoints under `/dashboard`:

     | Endpoint                | Method | Description                                         |
     |-------------------------|--------|-----------------------------------------------------|
     | `/dashboard/products`   | GET    | Returns total products analytics with optional `startDate`, `endDate`, and `bucket` parameters (day/week/month). |
     | `/dashboard/visitors`   | GET    | Returns visitor logs analytics with optional `startDate`, `endDate`, and `bucket` parameters (day/week/month). |

3. **Bucket-based filtering**
   - Implemented server-side logic to group data into `day`, `week`, or `month` buckets based on query parameters.
   - Responses include both `startDate` and `endDate` for each bucket.

4. **Security**
   - Used `.env` file to store sensitive database credentials and prevent uploading them to GitHub.
   - Added `.gitignore` for `node_modules` and `.env`.

---

## ⚙️ API Details

### 1. `/dashboard/products`
**Query Parameters (Optional)**

| Parameter  | Type   | Format      | Options       |
|------------|--------|------------|---------------|
| startDate  | String | YYYY-MM-DD | -             |
| endDate    | String | YYYY-MM-DD | -             |
| bucket     | String | -          | day, week, month |

**Sample Response**
```json
{
  "buckets": [
    {
      "startDate": "2025-09-01",
      "endDate": "2025-09-07",
      "totalProducts": 120
    },
    ...
  ]
}



2. /dashboard/visitors

Query Parameters (Optional)

Parameter	Type	Format	Options
startDate	String	YYYY-MM-DD	-
endDate	String	YYYY-MM-DD	-
bucket	String	-	day, week, month



{
  "buckets": [
    {
      "startDate": "2025-09-01",
      "endDate": "2025-09-07",
      "totalVisitors": 350
    },
    ...
  ]
}


// 💾 How to Run

Clone the repository

git clone https://github.com/YourUsername/ecom-evaluation-app.git


Install dependencies

npm install


Create .env with your database credentials

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecom_val
DB_PORT=3306


Start the server

node server/app.js


Access APIs

GET http://localhost:3001/dashboard/products
GET http://localhost:3001/dashboard/visitors
# battery-share-app
Earn money, Just sharing your battery

## Required Features and Mechanisms

Main Features:
- User registration and account management
- Mobile battery registration and management
- Location-based battery search
- Reservation and rental system
- Payment functionality
- Review and rating system

Mechanism:
1. Users register in the app and complete KYC verification
2. Battery owners register their devices and set rental conditions
3. Borrowers search for nearby batteries in the app and make reservations
4. Smart contracts process reservations and manage deposits
5. IoT devices track battery usage and record it on the blockchain
6. Upon return, smart contracts calculate fees and automatically settle payments
7. Users provide mutual evaluations, reflecting on trust scores

This application achieves transparency, security, and automated settlements through blockchain technology. Additionally, integration with IoT enables efficient asset management.

## Directory Structure
```
battery-sharing-app/
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── styles/
│   ├── lib/
│   └── public/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllersD
│   │   ├── models/
│   │   └── utils/
│   └── tests/
├── blockchain/
│   ├── programs/
│   │   └── battery_sharing/
│   ├── tests/
│   └── scripts/
└── iot/
    └── src/
```
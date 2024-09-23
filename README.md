# Commute Cargo
Earn money, Just sharing space

## Demo
https://youtu.be/F86Z5PD06ws

## Directory Structure
```
commute-cargo-app/
├── frontend/
│   ├── node_modules/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
├── backend/
│   ├── src/
│   │   ├── db/
│   ├── node_modules/
├── blockchain/
│   ├── programs/
│   │   └── battery_sharing/
│   ├── tests/
│   └── scripts/
```
## frontend
```
yarn install
yarn dev
```

## backend
**redis serverを起動**
```
brew install redis # インストールしていない場合
redis-server
```
**server側のnodeを起動**
```
npm start
```
## blockchain
下記を参考にして、local validatorを立ち上げる
https://note.com/standenglish/n/nd90e38db1781
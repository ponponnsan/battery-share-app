from flask import Flask, jsonify
from flask_cors import CORS
from solana.rpc.async_api import AsyncClient
from solana.rpc.commitment import Confirmed
from solana.transaction import Transaction, instructions
from solana.keypair import Keypair
from solana.publickey import PublicKey
import asyncio

app = Flask(__name__)
CORS(app)

# Solana の設定
SOLANA_RPC_URL = "https://api.devnet.solana.com"
PROGRAM_ID = "3L8GjmgVKZ7y8qoFJbFPspwtUSwY4MeRu5TbeGePvLQQ"  # デプロイしたプログラムの ID に置き換えてください

@app.route('/invoke-program')
def invoke_program():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(run_solana_program())
    return jsonify(result)

async def run_solana_program():
    async with AsyncClient(SOLANA_RPC_URL) as client:
        try:
            payer = Keypair()
            program_id = PublicKey(PROGRAM_ID)

            transaction = Transaction()
            transaction.add(
                TransactionInstruction(
                    keys=[],
                    program_id=program_id
                )
            )

            signature = await client.send_transaction(transaction, payer)
            await client.confirm_transaction(signature, commitment=Confirmed)

            tx_info = await client.get_transaction(signature)
            logs = tx_info['result']['meta']['logMessages']

            return {"message": "\n".join(logs)}
        except Exception as e:
            return {"error": str(e)}

if __name__ == '__main__':
    app.run(debug=True, port=5000)
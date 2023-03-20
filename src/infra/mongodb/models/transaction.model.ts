import mongoose from "mongoose";

const { Schema } = mongoose;

const transactionSchema = new Schema(
    {
        trx_id: {
            index: true,
            type: String,
            unique: true,
            required: true,
            maxLength: 100,
        },

        trx_sourceId: {
            type: String,
            maxLength: 100,
        },
    },
    {
        _id: true,
        collection: "transactions",
    },
);

transactionSchema.pre("save", function () { });

const TransactionModels = mongoose.model("Transaction", transactionSchema);

export default TransactionModels;

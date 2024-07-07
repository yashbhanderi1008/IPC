import mongoose from "mongoose";

export class ConnectDB {
    private _conn: string

    constructor(connectionString: string) {
        this._conn = connectionString;
    }

    async connect() {
        return await mongoose.connect(this._conn)
    }
}

import { Table, PrimaryKey, Column, Model, ForeignKey } from "sequelize-typescript";
import Permission from "./permission";
import Role from "./role.model";

@Table({
    tableName: "role_permissions",
    timestamps: true,
})
class RolePermission extends Model {
    @PrimaryKey
    @Column({
        autoIncrement: true,
    })
    id: number;

    @ForeignKey(() => Role)
    role_id: number;

    @ForeignKey(() => Permission)
    permission_id: string;

    public transform(item) {
        return {
            item
        }
    }
}

export default RolePermission;

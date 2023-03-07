
import { Table, PrimaryKey, Column, Model, BelongsToMany } from "sequelize-typescript";
import Role from "./role.model";
import RolePermission from "./role_permission";

@Table({
    tableName: "permissions",
    timestamps: true,
})
class Permission extends Model {
    @PrimaryKey
    @Column({
        autoIncrement: true,
    })
    id: number;

    @Column
    perm_name: number;

    @Column
    perm_description: string;

    @BelongsToMany(() => Role, { as: "roles", through: () => RolePermission })

    public transform(item) {
        return {
            item
        }
    }

}

export default Permission;

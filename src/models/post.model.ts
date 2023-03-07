import { Table, Model, Column, PrimaryKey, BelongsToMany, BelongsTo, HasOne, ForeignKey } from "sequelize-typescript";
import File from "./file.model";
@Table({
  tableName: "posts",
  timestamps: true,
})

export default class Post extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @Column
  type: string;

  @Column
  description: string;

  @Column
  isFeatured: boolean;

  @Column
  content: string;

  @Column
  status: string;

  @ForeignKey(() => File)
  @Column
  file_id: number;

  @BelongsTo(() => File)
  file: File;

  public static transform(item: any) {
    return {
      "id": item.id,
      "name": item.name,
      "type": item.type,
      "description": item.description,
      "isFeatured": item.isFeatured,
      "content": item.content,
      "status": item.status,
      "createdAt": item.createdAt,
      "updatedAt": item.updatedAt,
      "thumbnail": item.file ? item.file.path : ""
    }
  }
}

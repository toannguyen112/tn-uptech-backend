import { Table, Model, Column, PrimaryKey, ForeignKey } from "sequelize-typescript";
import File from "./file.model";
import Post from "./post.model";

@Table({
  tableName: "post_files",
  timestamps: false,
})
export default class PostFile extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => File)
  @Column
  file_id: number;

  @ForeignKey(() => Post)
  @Column
  post_id: number;

}

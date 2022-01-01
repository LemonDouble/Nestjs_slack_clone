import dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ChannelChats } from './src/entities/ChannelChats';
import { ChannelMembers } from './src/entities/ChannelMembers';
import { Channels } from './src/entities/Channels';
import { DMs } from './src/entities/DMs';
import { Mentions } from './src/entities/Mentions';
import { Users } from './src/entities/Users';
import { WorkspaceMembers } from './src/entities/WorkspaceMembers';
import { Workspaces } from './src/entities/Workspaces';

// 혹시 문제 생기면 위의 import가
// src/entities/Users 처럼 ./ 빠진거 아닌지 보자..
dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    ChannelChats,
    ChannelMembers,
    Channels,
    DMs,
    Mentions,
    Users,
    WorkspaceMembers,
    Workspaces,
  ],
  charset: 'utf8mb4',
  synchronize: false, // 만약 JS Entity만 있으면, DDL 생성해서 DB에 넣어주는 옵션. 실사용시에는 False로 해서 쓸것
  logging: true,
  keepConnectionAlive: true, // Hot Realoding 사용시 Connection 관련 문제 있어서 임시 사용..
};

export = config;

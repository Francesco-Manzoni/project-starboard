import Dexie, { Table } from 'dexie';

export interface Project {
  id?: number;
  name: string;
  description: string;
  createdAt?: Date;
  stars: number;
  alreadyStarred?: boolean;
}

export class MySubClassedDexie extends Dexie {
  projects!: Table<Project>;

  constructor() {
    super('project-starboard');
    this.version(1).stores({
      projects: '++id, name, description, stars, alreadyStarred, createdAt',
    });
  }
}

export const db = new MySubClassedDexie();

export const addProject = async (project: Project) => {
  return await db.projects.add(project);
};

export const getProjects = async () => {
  return await db.projects.toArray();
};

export const updateStars = async (id: number) => {
  await db.projects.get(id).then((project) => {
    if (project) {
      if (project.alreadyStarred) {
        return db.projects.update(id, {
          stars: project.stars - 1,
          alreadyStarred: false,
        });
      } else {
        return db.projects.update(id, {
          stars: project.stars + 1,
          alreadyStarred: true,
        });
      }
    }
  });
};

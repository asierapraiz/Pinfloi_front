export class Usuario {
  public constructor(init?: Partial<Usuario>) {
    Object.assign(this, init);
}
  id: number;
  username: string;
  password: string;
  nombre: string;
  apellido: string;
  email: string;
  roles: string[] = [];
}

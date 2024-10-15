export interface artesano {
    artesanoRoleId: number; 
    user: {
      id: number; 
      name: string; 
      lastname?: string; 
      email?: string; 
    };
}
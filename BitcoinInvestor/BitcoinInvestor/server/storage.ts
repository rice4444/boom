import { users, contactMessages, type User, type InsertUser, type ContactMessage, type InsertContactMessage, type UpdateUserInvestment } from "@shared/schema";
import { supabase } from "./supabase";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserInvestment(id: number, data: UpdateUserInvestment): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class SupabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
    
    return data ? {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      plan: data.plan,
      amount: data.amount,
      joinDate: new Date(data.join_date)
    } : undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) {
      if (error.code !== 'PGRST116') { // Not found error
        console.error('Error fetching user by email:', error);
      }
      return undefined;
    }
    
    return data ? {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      plan: data.plan,
      amount: data.amount,
      joinDate: new Date(data.join_date)
    } : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert({
        name: insertUser.name,
        email: insertUser.email,
        password: insertUser.password,
        plan: insertUser.plan || "starter",
        amount: insertUser.amount || 100
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating user:', error);
      throw new Error(`Failed to create user: ${error.message}`);
    }
    
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      plan: data.plan,
      amount: data.amount,
      joinDate: new Date(data.join_date)
    };
  }

  async updateUserInvestment(id: number, data: UpdateUserInvestment): Promise<User | undefined> {
    const { data: updatedData, error } = await supabase
      .from('users')
      .update({
        plan: data.plan,
        amount: data.amount
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating user investment:', error);
      return undefined;
    }
    
    return updatedData ? {
      id: updatedData.id,
      name: updatedData.name,
      email: updatedData.email,
      password: updatedData.password,
      plan: updatedData.plan,
      amount: updatedData.amount,
      joinDate: new Date(updatedData.join_date)
    } : undefined;
  }

  async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Error fetching all users:', error);
      return [];
    }
    
    return data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      plan: user.plan,
      amount: user.amount,
      joinDate: new Date(user.join_date)
    }));
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name: insertMessage.name,
        email: insertMessage.email,
        subject: insertMessage.subject,
        message: insertMessage.message
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating contact message:', error);
      throw new Error(`Failed to create contact message: ${error.message}`);
    }
    
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      createdAt: new Date(data.created_at)
    };
  }
}

export const storage = new SupabaseStorage();

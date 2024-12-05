export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category = 'arrays' | 'strings' | 'dp' | 'trees';

export interface TestCase {
  input: any[];
  expectedOutput: any;
}

export interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  starterCode?: string;
  testCases?: Array<{ input: any; output: any }>;
} 
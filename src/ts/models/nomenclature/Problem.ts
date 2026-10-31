export type ProblemStatus = "new" | "in_progress" | "resolved" | "rejected";

export type ProblemPlatform = "ios" | "android" | "web" | "unknown";

export type ProblemAttachment = {
  id: number;
  order_index: number;
  url: string;
};

export type Problem = {
  id: number;
  text: string;
  user_id: number | null;
  platform: ProblemPlatform;
  device_name: string | null;
  app_version: string | null;
  status: ProblemStatus;
  admin_message: string | null;
  status_updated_at: string | null;
  attachments: ProblemAttachment[];
  created_at: string;
  updated_at: string | null;
};

export type ProblemReporter = {
  id: number;
  username: string;
  fullname: string | null;
  email: string;
};

export type AdminProblem = Problem & {
  user_agent: string | null;
  reporter: ProblemReporter | null;
};

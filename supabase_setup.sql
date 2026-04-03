-- =====================================================
-- 速锋科技 tktkx.cn 用户系统建表 SQL
-- 在 Supabase 控制台 SQL Editor 中执行
-- =====================================================

-- 1. 创建用户档案表（存用户名+邮箱，方便后台查看）
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username    TEXT NOT NULL,
  email       TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. 开启 RLS（行级安全）
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 3. 策略：用户只能读自己的数据
CREATE POLICY "用户读取自己的资料"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- 4. 策略：用户注册时可以插入自己的数据
CREATE POLICY "用户插入自己的资料"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 5. 策略：管理员可以查看所有用户（通过 service_role key）
--    前端管理后台使用 anon key，需要额外建一个允许所有认证用户读取的策略
--    （或者在后台用 service role key，这里先用简单方案：管理员邮箱白名单）
CREATE POLICY "管理员查看所有用户"
  ON public.user_profiles
  FOR SELECT
  USING (
    auth.jwt() ->> 'email' IN ('admin@tktkx.cn', '58734099@qq.com')
  );

-- =====================================================
-- 完成！然后去 Supabase > Authentication > Settings
-- 关闭 "Enable email confirmations"（让用户注册后直接登录）
-- =====================================================

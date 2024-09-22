import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CommuteCargaLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // useNavigateフックを使用してナビゲーションを設定

  const handleSignUpClick = () => {
    navigate('/signup');  // サインアップ画面に遷移
  };


  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login with:', email, password);
    // Here you would typically handle the login logic
  };

  const handleGmailLogin = () => {
    console.log('Login with Gmail');
    // Here you would typically handle the Gmail login logic
  };

  return (
    <Card className="w-full max-w-md mx-auto h-screen flex flex-col">
      <CardHeader className="bg-red-500 text-white flex items-center p-4">
        <ArrowLeft className="h-6 w-6 mr-4" />
        <h2 className="text-xl font-bold flex-grow">Commute Cargo</h2>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="flex items-center justify-center my-6">
          <img src="/api/placeholder/120/120" alt="Commute Cargo Logo" className="w-30 h-30" />
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white">
                Login
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
              <Button 
                type="button"  // 画面遷移の場合は type="button" にする
                className="w-full bg-red-500 hover:bg-red-600 text-white"
                onClick={handleSignUpClick}  // ボタンクリック時に画面遷移を実行
              >
                Sign Up
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button
            onClick={handleGmailLogin}
            className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center justify-center"
          >
            <img src="/api/placeholder/20/20" alt="Gmail" className="w-5 h-5 mr-2" />
            Continue with Gmail
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          By continuing, you agree to Commute Cargo's Terms of Service and Privacy Policy.
        </p>
      </CardContent>
    </Card>
  );
};

export default CommuteCargaLogin;

import React from 'react';

const UserDashboard = () => {
  return (
    <div className="bg-[#e9dfcd] flex items-center justify-center min-h-screen">
      <div className="bg-[#2b2622] text-white w-80 rounded-2xl p-6 space-y-6 shadow-lg">
        {/* Profile */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-[#e56733] flex items-center justify-center text-5xl">
            👨‍🦰
          </div>
          <h1 className="mt-4 text-2xl font-bold flex items-center gap-1">
            🐥 ME
          </h1>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-[#3d3834] px-4 py-3 rounded-lg">
            <span className="flex items-center gap-2">
              ⏰ <span>Total Reading Time</span>
            </span>
            <span className="font-semibold">7 hrs</span>
          </div>

          <div className="flex items-center justify-between bg-[#3d3834] px-4 py-3 rounded-lg">
            <span className="flex items-center gap-2">
              📘 <span>Total Books Viewed</span>
            </span>
            <span className="font-semibold">24</span>
          </div>

          <div className="flex items-center justify-between bg-[#3d3834] px-4 py-3 rounded-lg text-red-400 hover:text-red-500 cursor-pointer">
            <span className="flex items-center gap-2">
              ⏻ <span>Log Out</span>
            </span>
          </div>

          <div className="flex items-center justify-between bg-[#3d3834] px-4 py-3 rounded-lg">
            <span className="flex items-center gap-2">
              ⏰ <span>Time on Website</span>
            </span>
            <span className="font-semibold">14 hrs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

// import React from 'react';
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { LogOut, BookOpen, Clock, Heart, Calendar, BarChart2, Settings } from 'lucide-react';

// const Dashboard = () => {
//   const user = {
//     name: "Devesh",
//     avatar: "🧑‍💻",
//     joined: "March 2024",
//     interests: ["Science", "Anime", "Literature"],
//     totalReadingTime: 34,
//     monthlyReadingTime: 12,
//     totalBooksViewed: 78,
//     totalBooksRead: 35,
//     favorites: 14,
//     currentStreak: 5,
//     lastBook: "Atomic Habits"
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#fdf6ec] to-[#f9e4c8] p-6 font-urbanist">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-6">
//           <div className="text-6xl">{user.avatar}</div>
//           <h1 className="text-2xl font-bold mt-2">Welcome, {user.name}</h1>
//           <p className="text-gray-600">Member since {user.joined}</p>
//         </div>

//         {/* Tabs */}
//         <Tabs defaultValue="stats" className="w-full">
//           <TabsList className="grid grid-cols-3 bg-white shadow rounded-xl mb-4">
//             <TabsTrigger value="stats">📊 Stats</TabsTrigger>
//             <TabsTrigger value="favorites">❤️ Favorites</TabsTrigger>
//             <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
//           </TabsList>

//           {/* Stats Tab */}
//           <TabsContent value="stats">
//             <div className="grid grid-cols-2 gap-4">
//               <Card>
//                 <CardContent className="flex items-center justify-between p-4">
//                   <Clock className="text-pink-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Total Reading Time</p>
//                     <h3 className="text-xl font-semibold">{user.totalReadingTime} hrs</h3>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardContent className="flex items-center justify-between p-4">
//                   <Calendar className="text-blue-400" />
//                   <div>
//                     <p className="text-sm text-gray-500">This Month</p>
//                     <h3 className="text-xl font-semibold">{user.monthlyReadingTime} hrs</h3>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardContent className="flex items-center justify-between p-4">
//                   <BookOpen className="text-green-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Books Viewed</p>
//                     <h3 className="text-xl font-semibold">{user.totalBooksViewed}</h3>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardContent className="flex items-center justify-between p-4">
//                   <Heart className="text-red-400" />
//                   <div>
//                     <p className="text-sm text-gray-500">Favorites</p>
//                     <h3 className="text-xl font-semibold">{user.favorites}</h3>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardContent className="flex items-center justify-between p-4">
//                   <BarChart2 className="text-indigo-500" />
//                   <div>
//                     <p className="text-sm text-gray-500">Reading Streak</p>
//                     <h3 className="text-xl font-semibold">{user.currentStreak} days</h3>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardContent className="flex items-center justify-between p-4">
//                   <BookOpen className="text-yellow-600" />
//                   <div>
//                     <p className="text-sm text-gray-500">Last Book Read</p>
//                     <h3 className="text-xl font-semibold">{user.lastBook}</h3>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </TabsContent>

//           {/* Favorites Tab */}
//           <TabsContent value="favorites">
//             <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
//               <p>You have {user.favorites} favorite books.</p>
//               <p className="mt-2">(Display favorites list here)</p>
//             </div>
//           </TabsContent>

//           {/* Settings Tab */}
//           <TabsContent value="settings">
//             <div className="bg-white rounded-xl shadow p-6 space-y-4">
//               <div className="text-gray-700">Interests: {user.interests.join(", ")}</div>
//               <Button variant="destructive" className="flex items-center gap-2">
//                 <LogOut /> Log Out
//               </Button>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

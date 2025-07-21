import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"
import ChessBoard from "@/components/ChessBoard"
import { useState } from "react"

export default function Index() {
  const [showChessBoard, setShowChessBoard] = useState(false)

  if (showChessBoard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button 
              onClick={() => setShowChessBoard(false)}
              variant="outline" 
              className="mb-4"
            >
              <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
              Назад на главную
            </Button>
            <h1 className="font-playful text-3xl text-primary">Играем в шахматы! ♔</h1>
            <div></div>
          </div>
          <ChessBoard />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-yellow-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xl">♔</span>
            </div>
            <h1 className="font-playful text-2xl text-primary">ШахматкиДети</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hover:bg-primary/10">
              <Icon name="User" className="mr-2 h-4 w-4" />
              Войти
            </Button>
            <Button className="bg-secondary hover:bg-secondary/90 text-black font-semibold">
              Регистрация
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playful text-6xl md:text-7xl mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
            Играй в Шахматы!
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 animate-fade-in [animation-delay:0.2s]">
            Изучай, играй и побеждай в самой увлекательной шахматной платформе для детей! 🎮
          </p>
          <div className="flex justify-center mb-12">
            <img 
              src="/img/db6bb801-40c0-4515-8d96-51316452a893.jpg" 
              alt="Веселые шахматные фигуры" 
              className="w-80 h-80 object-cover rounded-3xl shadow-2xl animate-scale-in [animation-delay:0.4s]"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white font-playful text-xl px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-200"
              onClick={() => setShowChessBoard(true)}
            >
              <Icon name="Play" className="mr-2 h-6 w-6" />
              Начать играть
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-black font-playful text-xl px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-200">
              <Icon name="Trophy" className="mr-2 h-6 w-6" />
              Турниры
            </Button>
          </div>
        </div>
      </section>

      {/* Game Rooms Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="font-playful text-4xl text-primary mb-4">Игровые Комнаты 🏰</h3>
          <p className="text-lg text-gray-600">Выбери комнату по своему уровню и начни играть!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Новички",
              description: "Для тех, кто только начинает",
              level: "Легко",
              players: "12 игроков",
              color: "bg-green-100 border-green-300",
              icon: "🌱"
            },
            {
              title: "Знатоки",
              description: "Для опытных шахматистов",
              level: "Средне",
              players: "8 игроков",
              color: "bg-blue-100 border-blue-300",
              icon: "🧠"
            },
            {
              title: "Мастера",
              description: "Для настоящих чемпионов",
              level: "Сложно",
              players: "4 игрока",
              color: "bg-purple-100 border-purple-300",
              icon: "👑"
            }
          ].map((room, index) => (
            <Card key={index} className={`p-6 ${room.color} border-2 hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer`}>
              <div className="text-center">
                <div className="text-4xl mb-3">{room.icon}</div>
                <h4 className="font-playful text-2xl text-gray-800 mb-2">{room.title}</h4>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="secondary" className="bg-white/70">{room.level}</Badge>
                  <span className="text-sm text-gray-500">{room.players}</span>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-full">
                  <Icon name="Play" className="mr-2 h-4 w-4" />
                  Играть
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Tournaments Section */}
      <section className="bg-gradient-to-r from-yellow-100 to-orange-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="font-playful text-4xl text-primary mb-4">Турниры 🏆</h3>
            <p className="text-lg text-gray-600">Участвуй в соревнованиях и выигрывай призы!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-yellow-200 hover:shadow-xl transition-all duration-200">
              <div className="text-center">
                <div className="text-6xl mb-4">🥇</div>
                <h4 className="font-playful text-2xl text-gray-800 mb-3">Еженедельный Турнир</h4>
                <p className="text-gray-600 mb-4">Каждую субботу в 15:00</p>
                <div className="flex justify-center gap-2 mb-6">
                  <Badge className="bg-yellow-200 text-yellow-800">32 участника</Badge>
                  <Badge className="bg-green-200 text-green-800">Приз: Медаль</Badge>
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90 text-black font-semibold rounded-full">
                  <Icon name="Calendar" className="mr-2 h-4 w-4" />
                  Записаться
                </Button>
              </div>
            </Card>
            
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-purple-200 hover:shadow-xl transition-all duration-200">
              <div className="text-center">
                <div className="text-6xl mb-4">🎪</div>
                <h4 className="font-playful text-2xl text-gray-800 mb-3">Чемпионат Месяца</h4>
                <p className="text-gray-600 mb-4">Большой турнир для всех!</p>
                <div className="flex justify-center gap-2 mb-6">
                  <Badge className="bg-purple-200 text-purple-800">128 участников</Badge>
                  <Badge className="bg-gold-200 text-gold-800">Приз: Кубок</Badge>
                </div>
                <Button className="w-full bg-accent hover:bg-accent/90 text-white font-semibold rounded-full">
                  <Icon name="Star" className="mr-2 h-4 w-4" />
                  Участвовать
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="font-playful text-4xl text-primary mb-4">Что тебя ждёт? ✨</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { icon: "🎨", title: "Красочная графика", desc: "Яркие и веселые шахматы" },
            { icon: "🔊", title: "Звуковые эффекты", desc: "Каждый ход с музыкой" },
            { icon: "🏅", title: "Система наград", desc: "Собирай достижения" },
            { icon: "👥", title: "Игра с друзьями", desc: "Приглашай друзей играть" }
          ].map((feature, index) => (
            <Card key={index} className="p-6 text-center bg-white/70 backdrop-blur-sm border-2 border-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-200">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h4 className="font-playful text-lg text-gray-800 mb-2">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Profile Preview Section */}
      <section className="bg-gradient-to-r from-purple-100 to-pink-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-playful text-4xl text-primary mb-8">Личный Кабинет 👤</h3>
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-purple-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="User" className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-playful text-xl mb-2">Твой профиль</h4>
                  <p className="text-gray-600">Статистика и достижения</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="BarChart" className="h-8 w-8 text-black" />
                  </div>
                  <h4 className="font-playful text-xl mb-2">Прогресс</h4>
                  <p className="text-gray-600">Следи за улучшениями</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Users" className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-playful text-xl mb-2">Друзья</h4>
                  <p className="text-gray-600">Играй с товарищами</p>
                </div>
              </div>
              <div className="mt-8">
                <Button className="bg-primary hover:bg-primary/90 text-white font-playful text-lg px-8 py-3 rounded-full">
                  <Icon name="Settings" className="mr-2 h-5 w-5" />
                  Мой кабинет
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">♔</span>
                </div>
                <span className="font-playful text-xl">ШахматкиДети</span>
              </div>
              <p className="text-gray-400">Лучшая шахматная платформа для детей!</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Игра</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Новая партия</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Турниры</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Обучение</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Сообщество</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Форум</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Друзья</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Клубы</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Помощь</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Правила</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Поддержка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ШахматкиДети. Все права защищены. 🚀</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
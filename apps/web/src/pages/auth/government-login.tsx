import { SignIn } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { GraduationCap, Landmark } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export function GovernmentLogin() {
  return (
    <div className="min-h-screen bg-muted/50 flex flex-col">
      <header className="p-6">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="font-display font-bold text-xl">StudyAI</span>
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <Card>
            <CardHeader className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Landmark className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Área do Governo</CardTitle>
              <CardDescription>
                Acesso para redes públicas e secretarias de educação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignIn 
                routing="path" 
                path="/login/governo"
                redirectUrl="/governo"
              />
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              <Link to="/" className="text-primary hover:underline">
                Voltar para página inicial
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
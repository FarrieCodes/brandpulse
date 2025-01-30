import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function CompanySettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Company Settings</h1>
        <p className="text-muted-foreground">Manage your company profile and preferences</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
            <CardDescription>Update your company information visible to candidates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name</Label>
              <Input id="name" defaultValue="Acme Inc" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" type="url" defaultValue="https://acme.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Company Description</Label>
              <Textarea id="description" rows={4} defaultValue="Acme Inc is a leading technology company..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" defaultValue="Technology" />
            </div>
            <div className="flex justify-end">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90">Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Brand Colors</CardTitle>
            <CardDescription>Customize your employer branding colors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="primary">Primary Color</Label>
              <Input id="primary" type="color" defaultValue="#6366f1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondary">Secondary Color</Label>
              <Input id="secondary" type="color" defaultValue="#a855f7" />
            </div>
            <div className="flex justify-end">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90">Apply Colors</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


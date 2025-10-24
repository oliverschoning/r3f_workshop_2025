import { Canvas } from '@react-three/fiber'
import { Route, Switch } from 'wouter'
import { XR, createXRStore } from "@react-three/xr"

import * as examples from "./examples"

export default function App() {
  return (
    <Switch>
      <Route path="/" component={examples.HelloWorld} />
      <Route path="/examples">
        <div className="flex flex-col gap-2 p-2 text-blue-900">
          <a href='/examples/hello-world'>examples/hello-world</a>
          <a href='/examples/smartphone'>examples/smartphone</a>
          <a href='/examples/viverse-third-person'>examples/viverse-third-person</a>
          <a href='/examples/viverse-first-person'>examples/viverse-first-person</a>
          <a href='/examples/hello-xr'>examples/hello-xr</a>
        </div>
      </Route>
      <Route path="/examples/hello-world" component={examples.HelloWorld} />
      <Route path="/examples/smartphone" component={examples.Smartphone} />
      <Route path="/examples/viverse-third-person" component={examples.ViverseThirdPerson} />
      <Route path="/examples/viverse-first-person" component={examples.ViverseFirstPerson} />
      <Route path="/examples/hello-xr" component={examples.HelloXR} />
      <Route path="/examples/presentation" component={examples.Presentation} />
    </Switch>
  )
}

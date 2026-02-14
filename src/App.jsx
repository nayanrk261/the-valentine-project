import { useState, useEffect } from 'react'

const FUNNY_TEXTS = [
  "Nice try 😏",
  "That’s not an option 😂",
  "Button said NO to you 💀",
  "Try harder bro 😭",
  "Absolutely not 😌",
  "You really thought huh 🤡",
  "Wrong choice detected 🚨",
  "Nope. Never. Bye 👋",
  "System error: NO rejected ❌",
  "Awww, almost 😜",
  "That button is decorative 💅",
  "Mission failed successfully 🫡",
  "Keep dreaming 😴",
  "Say Yes already 😩",
  "Universe won’t allow this 🌌"
]

function App() {
  const [yesClicked, setYesClicked] = useState(false)
  const [noPos, setNoPos] = useState({ top: 'auto', left: 'auto', position: 'static' })
  const [tease, setTease] = useState(null) // { text, x, y, id }

  // Clean up tease after delay
  useEffect(() => {
    if (tease) {
      const timer = setTimeout(() => setTease(null), 2500)
      return () => clearTimeout(timer)
    }
  }, [tease])

  const handleNoInteraction = (e) => {
    // Prevent default click behavior if it's a click
    e.preventDefault();

    // Calculate safe random position within viewport
    // Padding to keep button fully visible
    const buttonWidth = 100; // approx
    const buttonHeight = 50; // approx
    const padding = 20;

    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;
    const minX = padding;
    const minY = padding;

    const randomX = Math.random() * (maxX - minX) + minX;
    const randomY = Math.random() * (maxY - minY) + minY;

    setNoPos({
      position: 'fixed',
      left: `${randomX}px`,
      top: `${randomY}px`,
      transition: 'all 0.2s ease-out' // fast movement
    })

    // Show random funny text
    let nextText;
    do {
      const idx = Math.floor(Math.random() * FUNNY_TEXTS.length)
      nextText = FUNNY_TEXTS[idx]
    } while (nextText === tease?.text) // Avoid immediate repeat

    // Random position for text, somewhat near the action or random on screen
    const textX = Math.random() * (window.innerWidth - 200) + 50;
    const textY = Math.random() * (window.innerHeight - 100) + 50;

    setTease({
      text: nextText,
      x: textX,
      y: textY,
      id: Date.now()
    })
  }

  if (yesClicked) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1 className="animate-pop" style={{ fontSize: '4em', margin: 0 }}>YAY!! 💘</h1>
        <div className="animate-pop" style={{ marginTop: '20px' }}>
          <img
            src="/us.jpg"
            alt="Happy Couple"
            style={{ maxWidth: '90%', borderRadius: '20px', boxShadow: '0 15px 30px rgba(0,0,0,0.2)', border: '5px solid white' }}
          />
        </div>
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center', position: 'relative', width: '100%' }}>
      <h1 className="animate-fade-in">
        Anjali, will you be my Valentine? 💖
      </h1>

      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', alignItems: 'center', minHeight: '80px', marginTop: '40px' }}>
        <button
          className="btn-yes"
          onClick={() => setYesClicked(true)}
        >
          YES
        </button>

        <button
          className="btn-no"
          onMouseEnter={handleNoInteraction}
          onClick={handleNoInteraction}
          style={noPos}
        >
          NO
        </button>
      </div>

      {tease && (
        <div
          key={tease.id}
          className="funny-text"
          style={{
            left: tease.x,
            top: tease.y
          }}
        >
          {tease.text}
        </div>
      )}
    </div>
  )
}

export default App

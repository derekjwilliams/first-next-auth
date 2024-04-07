import * as stylex from '@stylexjs/stylex'

const page = stylex.create({
  base: {
    display: 'grid',
    gridTemplateColumns:
      '[a1] 6fr [a2] 1fr [b2] 4fr [a3] 3fr [b3] 3fr [a4] 4fr [b4] 1fr [a5] 6fr [a6]',
    // gridTemplateColumns: '[a1] 4fr 1fr 3fr 2fr 2fr 3fr 1fr 4fr',
    gridTemplateRows: '2fr 1fr',
    gap: '1rem',
  },
  description: {
    backgroundColor: 'lightgreen',
    borderColor: 'darkgreen',
  },
})

export default function Login() {
  return (
    <div className='compound-grid'>
      <div className='a1-b4'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Pulvinar mattis nunc
        sed blandit libero volutpat. Mollis aliquam ut porttitor leo a diam
        sollicitudin tempor. Ut sem nulla pharetra diam sit amet. Mauris
        pellentesque pulvinar pellentesque habitant. Dui nunc mattis enim ut
        tellus elementum sagittis vitae et. Lectus arcu bibendum at varius vel.
        Nec feugiat in fermentum posuere urna nec tincidunt praesent semper.
        Ullamcorper malesuada proin libero nunc consequat. Tristique
        sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Sit
        amet est placerat in egestas erat. Quam nulla porttitor massa id neque
        aliquam vestibulum. Metus aliquam eleifend mi in nulla posuere
        sollicitudin aliquam ultrices. Mauris vitae ultricies leo integer
        malesuada nunc vel. Pellentesque habitant morbi tristique senectus et
        netus et.
      </div>
      <div className='a5-a6'>
        Nec feugiat nisl pretium fusce id velit. Mauris vitae ultricies leo
        integer malesuada. Faucibus interdum posuere lorem ipsum. Duis at tellus
        at urna condimentum mattis pellentesque id nibh. Amet aliquam id diam
        maecenas ultricies mi. Velit scelerisque in dictum non consectetur a
        erat.
      </div>
      <img
        className='a1-b2'
        height={460}
        width={460}
        alt='pests'
        src='/images/pests.svg'
      />
      <div className='b2-b4'>
        Dictumst vestibulum rhoncus est pellentesque. Condimentum vitae sapien
        pellentesque habitant. Nunc consequat interdum varius sit amet mattis
        vulputate. Urna nunc id cursus metus aliquam eleifend mi in nulla. Proin
        libero nunc consequat interdum. Eros in cursus turpis massa tincidunt
        dui ut ornare. Odio ut enim blandit volutpat. Egestas maecenas pharetra
        convallis posuere morbi. Malesuada fames ac turpis egestas integer eget
        aliquet nibh praesent. Congue quisque egestas diam in arcu cursus
        euismod quis. Cursus vitae congue mauris rhoncus aenean vel. Urna neque
        viverra justo nec ultrices. Donec et odio pellentesque diam volutpat
        commodo. Ut eu sem integer vitae justo eget magna fermentum. Aliquam
        faucibus purus in massa tempor nec feugiat nisl. Interdum posuere lorem
        ipsum dolor sit amet consectetur adipiscing. Luctus venenatis lectus
        magna fringilla urna porttitor rhoncus dolor. Pellentesque eu tincidunt
        tortor aliquam nulla facilisi. Dapibus ultrices in iaculis nunc. Integer
        enim neque volutpat ac tincidunt.
      </div>
      <div className='a1-b3'>
        Egestas maecenas pharetra convallis posuere morbi. Malesuada fames ac
        turpis egestas integer eget aliquet nibh praesent. Congue quisque
        egestas diam in arcu cursus euismod quis. Cursus vitae congue mauris
        rhoncus aenean vel. Urna neque viverra justo nec ultrices. Donec et odio
        pellentesque diam volutpat commodo. Ut eu sem integer vitae justo eget
        magna fermentum. Aliquam faucibus purus in massa tempor nec feugiat
        nisl. Interdum posuere lorem ipsum dolor sit amet consectetur
        adipiscing. Luctus venenatis lectus magna fringilla urna porttitor
        rhoncus dolor. Pellentesque eu tincidunt tortor aliquam nulla facilisi.
        Dapibus ultrices in iaculis nunc. Integer enim neque volutpat ac
        tincidunt.
      </div>
      <img
        className='a5-a6'
        height={160}
        width={160}
        alt='kitchen_under_plumbing.svg'
        src='/images/kitchen_under_plumbing.svg'
      />
      <div className='a5-a6'>
        Ac ut consequat semper viverra nam. Consectetur adipiscing elit ut
        aliquam purus sit amet luctus. Massa enim nec dui nunc mattis enim ut.
        Enim lobortis scelerisque fermentum dui. Sed tempus urna et pharetra.
        Arcu ac tortor dignissim convallis aenean et. Felis eget nunc lobortis
        mattis aliquam faucibus. Id aliquet lectus proin nibh nisl condimentum
        id. Iaculis at erat pellentesque adipiscing commodo elit. Sed arcu non
        odio euismod. Ipsum suspendisse ultrices gravida dictum fusce ut
        placerat. Lorem ipsum dolor sit amet. Ultricies mi eget mauris pharetra
        et ultrices neque. Odio euismod lacinia at quis risus sed vulputate. Nec
        ultrices dui sapien eget mi.
      </div>
      <div className='toes'>
        Mauris vitae ultricies leo integer malesuada. Maecenas volutpat blandit
        aliquam etiam. Adipiscing enim eu turpis egestas pretium aenean.
        Maecenas volutpat blandit aliquam etiam erat. Cursus metus aliquam
        eleifend mi in nulla posuere sollicitudin. Sed augue lacus viverra vitae
        congue eu. Mauris in aliquam sem fringilla ut. Amet consectetur
        adipiscing elit ut aliquam purus sit amet luctus. Diam quam nulla
        porttitor massa id neque. Lectus arcu bibendum at varius vel pharetra.
        Cras semper auctor neque vitae tempus. Ipsum suspendisse ultrices
        gravida dictum fusce ut. Et pharetra pharetra massa massa ultricies mi.
      </div>
    </div>
  )
}

import './style.css'

interface BlueScreenProps {
	isOpen: boolean
}

const BlueScreen = ({ isOpen }: BlueScreenProps) => {
	if (!isOpen) return null
	return (
		<div className='background'>
			<div>
				<pre>
					{`                                                                                 @     @         
                                                                                /@&@@@@@(        
                                                                                 &&&@@@@         
       (((@@@@@(((            (@@@(      ((@@@@@@@@@@@@@@@@@@@                   &&@@@@@         
    @@@@@@......@@@@@        @@@.@@@   @@@@................@@@                  &&&@@@@@@        
  @@@(..............@@@(    @@@...@@@ @@@.................@@@                 *&&&@@@@@@@@  
 @@@.....,@@@@@@,,,@@@&    @@&.....&@@@@@@@@@@@.....@@@&&@@@@@@@@@@@@@@@@     @@@@@@@@@@@@@@@@@@ 
@@(,,,,#@@**  *******    (@@/,,,,,,,/@@(     @@,,,,,@@@(@@@#*/*/*/*/*/*/#@@@(@@@%/*%@@*/*/*/@@@  
@@,,,,,@@@              @@@,,,,,*,,,,,@@@    @@,,,,,@@@@@******//////*****&@@@***@@@/////@@@@&   
@@@/////@@@####@@@@@## @@@/////%@@/////@@@   @@/////@@@@/////%@@@**@@@//////@@////#@@@@@@@@@##   
 &@@#/(/(/&@&@&/(/(/&@@@@/(/(/&@&@@/(/(/@@@. @@(/(/(@@@(#(#(@@@      @@@(#(#@@@(#(#(#(#(#(#(&@@@ 
  *@@&(((((((((((((&@@@#(((((((((@@@(((((#@@#@@((((&@@@&####%@@#    #@@%####&@@@&&&###########@@@
     %@@@@@###@@@@@%@@########@@@@%@@@@####@@@@##@@@% @@######@@@@@@@@#####@@@@@@@@@@@@@@@#####@@
        =========   ============     ======== =====    @@@###############&@@@@################@@@
    ===================================================== %@@@%%%###%%%@@@@% %@@@%########%%%@@@% 
    ====================================================== ,,@@@@@@@@@@,,    ,,@@@@@@@@@@@@@,,   `}
				</pre>
				<h2 style={{ fontWeight: 200 }}>
					): No Operating System Detected
				</h2>
				<p>
					I mean what did you expect? You deleted the C drive! Don't
					worry we will re-install Cat-OS 97 for you now.
				</p>
				<div className='loader'>
					<div className='loading-bar'></div>
				</div>
			</div>
		</div>
	)
}

export default BlueScreen

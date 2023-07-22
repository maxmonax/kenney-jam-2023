<?xml version="1.0" encoding="UTF-8"?>
<data version="1.0">
    <struct type="Settings">
        <key>fileFormatVersion</key>
        <int>6</int>
        <key>texturePackerVersion</key>
        <string>7.0.3</string>
        <key>autoSDSettings</key>
        <array>
            <struct type="AutoSDSettings">
                <key>scale</key>
                <double>1</double>
                <key>extension</key>
                <string></string>
                <key>spriteFilter</key>
                <string></string>
                <key>acceptFractionalValues</key>
                <false/>
                <key>maxTextureSize</key>
                <QSize>
                    <key>width</key>
                    <int>-1</int>
                    <key>height</key>
                    <int>-1</int>
                </QSize>
            </struct>
        </array>
        <key>allowRotation</key>
        <false/>
        <key>shapeDebug</key>
        <false/>
        <key>dpi</key>
        <uint>72</uint>
        <key>dataFormat</key>
        <string>phaser</string>
        <key>textureFileName</key>
        <filename></filename>
        <key>flipPVR</key>
        <false/>
        <key>pvrQualityLevel</key>
        <uint>3</uint>
        <key>astcQualityLevel</key>
        <uint>2</uint>
        <key>basisUniversalQualityLevel</key>
        <uint>2</uint>
        <key>etc1QualityLevel</key>
        <uint>40</uint>
        <key>etc2QualityLevel</key>
        <uint>40</uint>
        <key>dxtCompressionMode</key>
        <enum type="SettingsBase::DxtCompressionMode">DXT_PERCEPTUAL</enum>
        <key>ditherType</key>
        <enum type="SettingsBase::DitherType">PngQuantLow</enum>
        <key>backgroundColor</key>
        <uint>0</uint>
        <key>libGdx</key>
        <struct type="LibGDX">
            <key>filtering</key>
            <struct type="LibGDXFiltering">
                <key>x</key>
                <enum type="LibGDXFiltering::Filtering">Linear</enum>
                <key>y</key>
                <enum type="LibGDXFiltering::Filtering">Linear</enum>
            </struct>
        </struct>
        <key>shapePadding</key>
        <uint>0</uint>
        <key>jpgQuality</key>
        <uint>80</uint>
        <key>pngOptimizationLevel</key>
        <uint>1</uint>
        <key>webpQualityLevel</key>
        <uint>101</uint>
        <key>textureSubPath</key>
        <string></string>
        <key>textureFormat</key>
        <enum type="SettingsBase::TextureFormat">png8</enum>
        <key>borderPadding</key>
        <uint>0</uint>
        <key>maxTextureSize</key>
        <QSize>
            <key>width</key>
            <int>2048</int>
            <key>height</key>
            <int>2048</int>
        </QSize>
        <key>fixedTextureSize</key>
        <QSize>
            <key>width</key>
            <int>-1</int>
            <key>height</key>
            <int>-1</int>
        </QSize>
        <key>algorithmSettings</key>
        <struct type="AlgorithmSettings">
            <key>algorithm</key>
            <enum type="AlgorithmSettings::AlgorithmId">MaxRects</enum>
            <key>freeSizeMode</key>
            <enum type="AlgorithmSettings::AlgorithmFreeSizeMode">Best</enum>
            <key>sizeConstraints</key>
            <enum type="AlgorithmSettings::SizeConstraints">AnySize</enum>
            <key>forceSquared</key>
            <false/>
            <key>maxRects</key>
            <struct type="AlgorithmMaxRectsSettings">
                <key>heuristic</key>
                <enum type="AlgorithmMaxRectsSettings::Heuristic">Best</enum>
            </struct>
            <key>basic</key>
            <struct type="AlgorithmBasicSettings">
                <key>sortBy</key>
                <enum type="AlgorithmBasicSettings::SortBy">Best</enum>
                <key>order</key>
                <enum type="AlgorithmBasicSettings::Order">Ascending</enum>
            </struct>
            <key>polygon</key>
            <struct type="AlgorithmPolygonSettings">
                <key>alignToGrid</key>
                <uint>1</uint>
            </struct>
        </struct>
        <key>dataFileNames</key>
        <map type="GFileNameMap">
            <key>json</key>
            <struct type="DataFile">
                <key>name</key>
                <filename>../kenney-jam-2023/public/assets/atlases/game.json</filename>
            </struct>
        </map>
        <key>multiPackMode</key>
        <enum type="SettingsBase::MultiPackMode">MultiPackOff</enum>
        <key>forceIdenticalLayout</key>
        <false/>
        <key>outputFormat</key>
        <enum type="SettingsBase::OutputFormat">RGBA8888</enum>
        <key>alphaHandling</key>
        <enum type="SettingsBase::AlphaHandling">ClearTransparentPixels</enum>
        <key>contentProtection</key>
        <struct type="ContentProtection">
            <key>key</key>
            <string></string>
        </struct>
        <key>autoAliasEnabled</key>
        <true/>
        <key>trimSpriteNames</key>
        <true/>
        <key>prependSmartFolderName</key>
        <false/>
        <key>autodetectAnimations</key>
        <true/>
        <key>globalSpriteSettings</key>
        <struct type="SpriteSettings">
            <key>scale</key>
            <double>1</double>
            <key>scaleMode</key>
            <enum type="ScaleMode">Smooth</enum>
            <key>extrude</key>
            <uint>1</uint>
            <key>trimThreshold</key>
            <uint>1</uint>
            <key>trimMargin</key>
            <uint>1</uint>
            <key>trimMode</key>
            <enum type="SpriteSettings::TrimMode">Trim</enum>
            <key>tracerTolerance</key>
            <int>200</int>
            <key>heuristicMask</key>
            <false/>
            <key>defaultPivotPoint</key>
            <point_f>0.5,0.5</point_f>
            <key>writePivotPoints</key>
            <false/>
        </struct>
        <key>individualSpriteSettings</key>
        <map type="IndividualSpriteSettingsMap">
            <key type="filename">game/asteroids/meteorBrown_big1.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>25,21,51,42</rect>
                <key>scale9Paddings</key>
                <rect>25,21,51,42</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/asteroids/meteorBrown_big2.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>30,25,60,49</rect>
                <key>scale9Paddings</key>
                <rect>30,25,60,49</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/asteroids/meteorBrown_big3.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>22,21,45,41</rect>
                <key>scale9Paddings</key>
                <rect>22,21,45,41</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/asteroids/meteorBrown_big4.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>25,24,49,48</rect>
                <key>scale9Paddings</key>
                <rect>25,24,49,48</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/asteroids/meteorBrown_med1.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>11,11,21,21</rect>
                <key>scale9Paddings</key>
                <rect>11,11,21,21</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/asteroids/meteorBrown_med3.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>11,10,23,20</rect>
                <key>scale9Paddings</key>
                <rect>11,10,23,20</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/asteroids/meteorBrown_small1.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>7,7,14,14</rect>
                <key>scale9Paddings</key>
                <rect>7,7,14,14</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/asteroids/meteorBrown_small2.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>7,7,15,13</rect>
                <key>scale9Paddings</key>
                <rect>7,7,15,13</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/asteroids/meteorBrown_tiny1.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>5,5,9,9</rect>
                <key>scale9Paddings</key>
                <rect>5,5,9,9</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/asteroids/meteorBrown_tiny2.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>4,4,8,7</rect>
                <key>scale9Paddings</key>
                <rect>4,4,8,7</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/bullets/laserBlue01.png</key>
            <key type="filename">game/bullets/laserRed01.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>2,14,5,27</rect>
                <key>scale9Paddings</key>
                <rect>2,14,5,27</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/bullets/laserBlue02.png</key>
            <key type="filename">game/bullets/laserRed02.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>3,9,7,19</rect>
                <key>scale9Paddings</key>
                <rect>3,9,7,19</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/bullets/laserBlue03.png</key>
            <key type="filename">game/bullets/laserRed03.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>2,9,5,19</rect>
                <key>scale9Paddings</key>
                <rect>2,9,5,19</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/bullets/spaceMissiles_001.png</key>
            <key type="filename">game/bullets/spaceMissiles_002.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>10,17,20,35</rect>
                <key>scale9Paddings</key>
                <rect>10,17,20,35</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/fire00.png</key>
            <key type="filename">game/effects/fire08.png</key>
            <key type="filename">game/effects/fire09.png</key>
            <key type="filename">game/effects/fire10.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>4,10,8,20</rect>
                <key>scale9Paddings</key>
                <rect>4,10,8,20</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/fire01.png</key>
            <key type="filename">game/effects/fire04.png</key>
            <key type="filename">game/effects/fire05.png</key>
            <key type="filename">game/effects/fire06.png</key>
            <key type="filename">game/effects/fire07.png</key>
            <key type="filename">game/effects/fire11.png</key>
            <key type="filename">game/effects/fire14.png</key>
            <key type="filename">game/effects/fire15.png</key>
            <key type="filename">game/effects/fire16.png</key>
            <key type="filename">game/effects/fire17.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>4,8,7,15</rect>
                <key>scale9Paddings</key>
                <rect>4,8,7,15</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/fire02.png</key>
            <key type="filename">game/effects/fire12.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>4,8,7,16</rect>
                <key>scale9Paddings</key>
                <rect>4,8,7,16</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/fire03.png</key>
            <key type="filename">game/effects/fire13.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>4,9,7,17</rect>
                <key>scale9Paddings</key>
                <rect>4,9,7,17</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/fire18.png</key>
            <key type="filename">game/effects/fire19.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>4,10,8,21</rect>
                <key>scale9Paddings</key>
                <rect>4,10,8,21</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/shield1.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>33,27,67,54</rect>
                <key>scale9Paddings</key>
                <rect>33,27,67,54</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/shield2.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>36,30,71,59</rect>
                <key>scale9Paddings</key>
                <rect>36,30,71,59</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/shield3.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>36,34,72,69</rect>
                <key>scale9Paddings</key>
                <rect>36,34,72,69</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/spaceEffects_001.png</key>
            <key type="filename">game/effects/spaceEffects_017.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>4,6,7,11</rect>
                <key>scale9Paddings</key>
                <rect>4,6,7,11</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/spaceEffects_002.png</key>
            <key type="filename">game/effects/spaceEffects_018.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>3,8,7,15</rect>
                <key>scale9Paddings</key>
                <rect>3,8,7,15</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/spaceEffects_003.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>4,6,7,13</rect>
                <key>scale9Paddings</key>
                <rect>4,6,7,13</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/spaceEffects_004.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>3,8,7,16</rect>
                <key>scale9Paddings</key>
                <rect>3,8,7,16</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/spaceEffects_005.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>2,32,3,63</rect>
                <key>scale9Paddings</key>
                <rect>2,32,3,63</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/spaceEffects_006.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>3,32,6,63</rect>
                <key>scale9Paddings</key>
                <rect>3,32,6,63</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/spaceEffects_007.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>4,32,8,63</rect>
                <key>scale9Paddings</key>
                <rect>4,32,8,63</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/spaceEffects_008.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>5,5,11,11</rect>
                <key>scale9Paddings</key>
                <rect>5,5,11,11</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/spaceEffects_009.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>7,6,14,12</rect>
                <key>scale9Paddings</key>
                <rect>7,6,14,12</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/spaceEffects_010.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>8,7,15,14</rect>
                <key>scale9Paddings</key>
                <rect>8,7,15,14</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/spaceEffects_011.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>7,7,13,13</rect>
                <key>scale9Paddings</key>
                <rect>7,7,13,13</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/spaceEffects_012.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>8,8,16,16</rect>
                <key>scale9Paddings</key>
                <rect>8,8,16,16</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/spaceEffects_013.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>9,9,19,18</rect>
                <key>scale9Paddings</key>
                <rect>9,9,19,18</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/spaceEffects_014.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>9,9,17,18</rect>
                <key>scale9Paddings</key>
                <rect>9,9,17,18</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/spaceEffects_015.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>11,13,22,25</rect>
                <key>scale9Paddings</key>
                <rect>11,13,22,25</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/spaceEffects_016.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>13,13,25,26</rect>
                <key>scale9Paddings</key>
                <rect>13,13,25,26</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/speed.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>2,27,3,54</rect>
                <key>scale9Paddings</key>
                <rect>2,27,3,54</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/star1.png</key>
            <key type="filename">game/effects/star2.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>6,6,13,12</rect>
                <key>scale9Paddings</key>
                <rect>6,6,13,12</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/effects/star3.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>6,6,12,12</rect>
                <key>scale9Paddings</key>
                <rect>6,6,12,12</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/enemies/spaceShips_001.png</key>
            <key type="filename">game/hero/level_3.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>27,20,53,40</rect>
                <key>scale9Paddings</key>
                <rect>27,20,53,40</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/enemies/spaceShips_002.png</key>
            <key type="filename">game/hero/level_1.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>25,19,51,37</rect>
                <key>scale9Paddings</key>
                <rect>25,19,51,37</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/enemies/spaceShips_003.png</key>
            <key type="filename">game/hero/level_2.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>25,24,50,47</rect>
                <key>scale9Paddings</key>
                <rect>25,24,50,47</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/enemies/spaceShips_004.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>32,27,63,54</rect>
                <key>scale9Paddings</key>
                <rect>32,27,63,54</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/enemies/spaceShips_005.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>34,21,68,42</rect>
                <key>scale9Paddings</key>
                <rect>34,21,68,42</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/enemies/spaceShips_006.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>24,37,47,74</rect>
                <key>scale9Paddings</key>
                <rect>24,37,47,74</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/enemies/spaceShips_007.png</key>
            <key type="filename">game/hero/level_5.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>43,38,86,75</rect>
                <key>scale9Paddings</key>
                <rect>43,38,86,75</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/enemies/spaceShips_008.png</key>
            <key type="filename">game/hero/level_4.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>25,21,50,41</rect>
                <key>scale9Paddings</key>
                <rect>25,21,50,41</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/enemies/spaceShips_009.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>29,21,57,41</rect>
                <key>scale9Paddings</key>
                <rect>29,21,57,41</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/powerup.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>9,8,17,17</rect>
                <key>scale9Paddings</key>
                <rect>9,8,17,17</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/station/level_1.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>132,131,263,262</rect>
                <key>scale9Paddings</key>
                <rect>132,131,263,262</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/ui/blue.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>12,12,24,24</rect>
                <key>scale9Paddings</key>
                <rect>12,12,24,24</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
            <key type="filename">game/ui/btnPlay.png</key>
            <struct type="IndividualSpriteSettings">
                <key>pivotPoint</key>
                <point_f>0.5,0.5</point_f>
                <key>spriteScale</key>
                <double>1</double>
                <key>scale9Enabled</key>
                <false/>
                <key>scale9Borders</key>
                <rect>56,56,111,111</rect>
                <key>scale9Paddings</key>
                <rect>56,56,111,111</rect>
                <key>scale9FromFile</key>
                <false/>
            </struct>
        </map>
        <key>fileLists</key>
        <map type="SpriteSheetMap">
            <key>default</key>
            <struct type="SpriteSheet">
                <key>files</key>
                <array>
                    <filename>game</filename>
                </array>
            </struct>
        </map>
        <key>ignoreFileList</key>
        <array/>
        <key>replaceList</key>
        <array/>
        <key>ignoredWarnings</key>
        <array>
            <string>phaser3-exporter-beta</string>
        </array>
        <key>commonDivisorX</key>
        <uint>1</uint>
        <key>commonDivisorY</key>
        <uint>1</uint>
        <key>packNormalMaps</key>
        <false/>
        <key>autodetectNormalMaps</key>
        <true/>
        <key>normalMapFilter</key>
        <string></string>
        <key>normalMapSuffix</key>
        <string></string>
        <key>normalMapSheetFileName</key>
        <filename></filename>
        <key>exporterProperties</key>
        <map type="ExporterProperties"/>
    </struct>
</data>

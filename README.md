# Save My Date
A SMS reminder app
<br>
# User Story
#### 1. I can log-in with Facebook or Google, or I can create a new account
#### 2. I can schedule an SMS to be sent to my cell on a specific time and date 
# Screen Shots
![](https://lh6.googleusercontent.com/Ieto7N91GwxCVpgpcGAaXnzHa5zOxW343NmebdURBmApn80LPbD7UA3OWE6nUg69FtJtbVDk9g9pats=w1680-h942)
<br>
![](https://lh3.googleusercontent.com/WNvwyqIVt0CGC3ty_K6FAvKg51G1stTpdDRZDqoRBWrZBU_c4hfDXyJLTHeZJZtwRgT6OsNXY4XBcK53TX32EX4d-bDyNioKGXgUaemC0UFBpX6nTCWHPL0YViGSytCiHoqjbJn3jIXxtYHNNjIb0ETo2fETOdjcGy5JatGySfEgP8C1gL3WNoPZjYvRRlgawvjktRvsl7MV1JKwyaTROutgiWatnIP-FfAotewZAwAy2KRVXsSR8W7kJhrmASAxP2cEmgHFsXu5FAvKr4bKIzpoCS0fJlEfRlr7uiLsps9-bc-FxRO3CefYodGm7X35FK1OVe72XLUgWCXqlMRwKi-LfS-O-CVolbf-V4Iwn0yDyj9jWmeaJIt61F7-pyVn9xwYasOAVVRg_HHbGav9qTV2-mO4xn_LIyJNhtaV1MYAUMT7ijhJ8Vi_0Ozv-ntoGm7iNFchj8q0Bm7kgNih0chiWMKJDTqjVSqhDi2oc7534H3rkyS4e6TAu3BuhyymJy2o4C4rL1ZQUU7FR1EtDfzztBc-mwB_VMzJZfXgMhmYoLQCmWyPyTGT-VtIffufFSv84maN=w1680-h942)
<br>
![](https://lh3.googleusercontent.com/OWyvU-KKvI6hwcoqZsIL40x3mXvqjBe8E-Cxlg2X1sNvigLfp55UmmftTmetbnAActm_pHCCN9SbQhlC1XrJGlZhMVGRlfyypXIuF8u7DP0-LvVLGdkxUgBFYcG93q_uW6vcUxvz055boEVqYbvNpiofecxy9-EY4oIr759MfpIEIp9EjrXsrrkM6qecgbNVlalSXp3axCAJt7IJpsnZYbT0eMCxbh-lZlyPCbh_Y1mPtJMU2tOuwC_YqB0YXZWaMLGzrCXEE93m-qlRKHE5Lj_5eqWa8w3k_fphjsc-UxESZW0FVk-wv5LqafJBbI9J42fEyIOl3mV9ehgY7xWpqRWf7h6hyE3ejHgQm_b6xEJpwbkLxIqJ77oeMYKwWacFa35vTv5Oy8r8qF6eFXY2nDJcCiuGF34l6dSOQw4zgn8zVRFIluBqH0u_Lbz-NxANaIwbYbqdOKV4b-Tg6cB4GHm3y7a2w5uSShBb4C0KeMcG94WFu_zl1Ifqh3nXiEthAa-xbchEcpVg7kXYgiyAUOM-ncUnU1RI6Izx8FGH1XT0fWd92k69x8K5FcBhyKPJFXWpok_p=w1680-h942)
<br>
# Technologies Used
Save My Date was built on Node, using Express and MongoDB. Other technologies used included Grunt for task management, Handlebars for templating, Passport to handle Google/Facebook authentication, Twilio API and Cron to take care of scheduling. Built from scratch and set up to use MVC structuring.
# Issues
I had trouble decideing exactly how to start. Last time I built a Node app I kept everything in app.js, this time I wanted everything neat and separated using modules. I tried some scaffolding generators but, much like Rails, they didn't help me to understand how everything was connected. So I ultimately decided to make all the folder structures on my own, set up Grunt on my own so I knew how and why everything was working together. It took a lot of time, and I also spent most of the time setting up Passport to work, and figuring out Mongo, not leaving me much to get the actual scheduling working.

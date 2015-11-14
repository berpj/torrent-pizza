FROM    ubuntu:wily

# Download packages
RUN apt-get update
RUN apt-get install -y nodejs \
    	    	       npm \
		       curl \
		       git \
		       build-essential \
		       libssl-dev

RUN apt-get clean

RUN ln -s /usr/bin/nodejs /usr/bin/node

RUN npm update

RUN npm install -g npm

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install

# Bundle app source
COPY . /src

WORKDIR "/src"
EXPOSE  3000
CMD ["npm", "start"]

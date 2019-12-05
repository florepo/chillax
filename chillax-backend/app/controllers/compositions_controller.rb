class CompositionsController < ApplicationController

    def index
        compositions = Composition.all
        render json: compositions, include: [:sounds, :user, :composition_sounds]
    end

 
    def create
      name = params[params.keys[-5]]
      user_id = params[params.keys[-4]]

      composition = Composition.create(name: name, user_id: user_id)

       # identify the number pof compositon sounds for this compsition
       number_of_sounds = params.keys[0..-6].length
       
       # => loop over all sounds
       number_of_sounds.times do |index|
          sound_id = params[params.keys[index]]["id"]
          volume = params[params.keys[index]]["volume"]
          CompositionSound.create(sound_id: sound_id, volume: volume, composition_id: composition.id)
          #byebug

       end
       render json: composition
    end

    def destroy
        composition_sounds=CompositionSound.where(composition_id: params[:id])
        composition_sounds.each do |cs|
            cs.destroy
        end
        composition = Composition.find(params[:id])
        composition.destroy
    end
end

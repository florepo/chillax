class CompositionSerializer

    def initialize(composition_object)
        @composition = composition_object
    end

    def to_serialized_json()
        options ={ include: {:sounds =>             {:only => [:name, :description, :image_url,  :sound_url],},
                             :composition_sounds => {:only => [:volume, :sound_id]}
                            }  
        }
        
        @composition.to_json(options)
    end

end